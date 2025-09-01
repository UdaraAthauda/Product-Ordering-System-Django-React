from django.contrib import admin
from .models import *

admin.site.register(Category)
admin.site.register(Product)

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1
    fields = ('product', 'quantity', 'price')

class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemInline]
    list_display = ('id', 'company', 'status', 'total_amount', 'created_at', 'updated_at')
    list_filter = ('status', 'created_at', 'updated_at')
    search_fields = ('company__name',)


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)






