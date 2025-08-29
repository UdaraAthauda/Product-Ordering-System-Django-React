from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Company
from .serializers import CompanySerializer

class CompanyViewSet(ModelViewSet):
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
    def get_queryset(self):
        return Company.objects.filter(user=self.request.user)