from rest_framework import serializers
from .models import Company

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('id', 'name', 'user', 'phone', 'city', 'address')
        extra_kwargs = {'user': {'read_only': True}}