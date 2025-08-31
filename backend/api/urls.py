from django.urls import path, include
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,)
from company.views import CompanyViewSet
from order.views import *
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('company', CompanyViewSet, basename="company")


urlpatterns = [
    # Email verification endpoint
    path('auth/registration/account-confirm-email/<key>/', AutoVerifyEmailView.as_view(), name='account_confirm_email'),
    
    # Google OAuth2 login endpoint
    path('auth/google/login/', GoogleLoginView.as_view(), name='google_login'),
    
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # company app urls
    path('', include(router.urls)),
    
    # order app urls
    path('categories/', CategoryView.as_view(), name='categories'),
    path('products/', ProductView.as_view(), name='products'),
    path('products/<int:cat>/', ProductView.as_view(), name='product')
]