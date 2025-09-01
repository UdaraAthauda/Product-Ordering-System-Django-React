from django.contrib import admin
from .models import *

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 1
    fields = ('product', 'quantity')

class CartAdmin(admin.ModelAdmin):
    inlines = [CartItemInline]
    list_display = ('id', 'company', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('company__name',)
    

admin.site.register(CartItem)
admin.site.register(Cart, CartAdmin)

