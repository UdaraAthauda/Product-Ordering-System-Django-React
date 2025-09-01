from django.db import models
from company.models import Company
from order.models import Product

class Cart(models.Model):
    company = models.OneToOneField(Company, on_delete=models.CASCADE, related_name="cart")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart {self.id} - {self.company.name}"
    
    @property
    def total(self):
        return sum(item.subtotal for item in self.items.all())


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['cart', 'product'], name="unique_cart_product")
        ]

    @property
    def subtotal(self):
        return self.quantity * self.product.price
