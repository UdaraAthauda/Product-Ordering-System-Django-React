from django.contrib import admin
from .models import Company

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'user', 'phone', 'address', 'created_at', 'updated_at']
    search_fields = ['id', 'name', 'user__email', 'address', 'phone']
    