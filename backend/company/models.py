from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
import re

User = get_user_model()

# phone number validator
def validatePhone(value):
    regex = r'^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$'
    
    if not re.match(regex, value):
        raise ValidationError("Phone number is not valid, use this format (0710000000)")
    

class Company(models.Model):
    name = models.CharField(max_length=200, unique=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    phone = models.CharField(max_length=12, validators=[validatePhone])
    city = models.CharField(max_length=50, blank=True, null=True)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Companies'