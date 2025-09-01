from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer
from order.models import Product
from company.models import Company
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class CartView(APIView):
    def get(self, request, company_id):
        company = get_object_or_404(Company, id=company_id)
        
        cart, created = Cart.objects.get_or_create(company=company)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    

class AddToCartView(APIView):
    
    @swagger_auto_schema(
        operation_description="Add a product to the company's cart",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=["product_id", "quantity"],
            properties={
                "product_id": openapi.Schema(
                    type=openapi.TYPE_INTEGER, description="ID of the product to add"
                ),
                "quantity": openapi.Schema(
                    type=openapi.TYPE_INTEGER,
                    description="Quantity of the product to add (default=1)",
                ),
            },
        ),
        responses={201: CartSerializer, 400: "Bad Request"},
    )
    
    
    def post(self, request, company_id):
        company = get_object_or_404(Company, id=company_id)
        cart, created = Cart.objects.get_or_create(company=company)
        
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        
        product = get_object_or_404(Product, id=product_id)
        
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        
        cart_item.save()
        
        return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)