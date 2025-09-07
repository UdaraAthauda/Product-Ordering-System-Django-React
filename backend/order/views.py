from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404
from cart.models import Cart
from django.db import transaction
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class CategoryView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)

        return Response(serializer.data)


class ProductView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, cat=None):
        if cat:
            products = Product.objects.filter(category=cat)
            serializer = ProductSerializer(products, many=True)
        else:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
        
        return Response(serializer.data)
    

class OrderView(APIView):
    def get(self, request, company_id, order_id=None):
        company = get_object_or_404(Company, id=company_id, user=request.user)
        
        if order_id:
            order = Order.objects.get(id=order_id, company=company)
            
            return Response(OrderSerializer(order).data) 
        else:
            orders = Order.objects.filter(company=company)
        
            return Response(OrderSerializer(orders, many=True).data) 
        
    
    @swagger_auto_schema(
        operation_description="Update the order status",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["status"],
            properties={
                "status": openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description="order status",
                ),
            },
        ),
        responses={201: OrderSerializer, 400: "Bad Request"},
    )
        
    def patch(self, request, company_id, order_id):
        company = get_object_or_404(Company, id=company_id, user=request.user)
        order = get_object_or_404(Order, id=order_id, company=company)
        
        status = request.data.get('status')
        
        order.status = status
        order.save()
        
        return Response({'message': 'order updated'}, status=200)
    
    def delete(self, request, company_id, order_id):
        company = get_object_or_404(Company, id=company_id, user=request.user)
        order = get_object_or_404(Order, id=order_id, company=company)
        
        order.delete()
        
        return Response({'message': 'order deleted'}, status=200) 
    

@transaction.atomic
@api_view(['POST'])
def create_order(request, company_id):
    cart = get_object_or_404(Cart, company__id=company_id, company__user=request.user)
    
    if not cart.items.exists():
        return Response({"error": "Cart is empty"}, status=400)
    
    order = Order.objects.create(
        company = cart.company,
        total_amount = cart.total
    )
    
    for item in cart.items.all():
        OrderItem.objects.create(
            order = order,
            product = item.product,
            quantity = item.quantity,
            price = item.product.price
        )
        
    cart.items.all().delete()
    
    return Response({"success": "Order created"}, status=201)