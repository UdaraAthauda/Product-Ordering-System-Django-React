from django.urls import path, include
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,)
from company.views import CompanyViewSet
from order.views import *
from cart.views import *
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
    path('products/<int:cat>/', ProductView.as_view(), name='product'),
    
    # order creation/update/delete urls 
    path('order/<int:company_id>/', OrderView.as_view(), name='order'),
    path('order/create/<int:company_id>/', create_order, name='order-creation'),
    path('order/<int:company_id>/<int:order_id>/', OrderView.as_view(), name='order-update'),
    
    # cart app urls
    path('cart/<int:company_id>/', CartView.as_view(), name='cart-detail'),
    path('cart/add/<int:company_id>/', AddToCartView.as_view(), name='cart-add'),
    path('cart/item/<int:company_id>/<int:item_id>/', UpdateCartItemView.as_view(), name='cart-update'),
    path('cart/clear/<int:company_id>/', ClearCartView.as_view(), name='cart-clear'),
]