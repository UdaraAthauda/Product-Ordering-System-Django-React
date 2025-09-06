from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        
        
class OrderItemeSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    subtotal = serializers.ReadOnlyField()
    
    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'product_name', 'quantity', 'price', 'subtotal')
        

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemeSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = ('id', 'company', 'status', 'total_amount', 'items', 'created_at', 'updated_at')