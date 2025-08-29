from allauth.account.models import EmailConfirmationHMAC, EmailConfirmation
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth import get_user_model

User = get_user_model()

# Google OAuth2 token verification function
class GoogleLoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    
    def post(self, request):
        token = request.data.get('token')
        if not token:
            return Response({"error": "Token is required"}, status=400)
        
        try:
            # Verify the token with Google
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), None)
            email = idinfo['email']
            name = idinfo.get('name', '')
            
            # Get or Create the User
            user, created = User.objects.get_or_create(email=email, defaults={'username': email, 'first_name': name})
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'name': user.first_name
                }
            })
            
        except ValueError as e:
            return Response({"error": str(e)}, status=400)
        
            
# View to automatically verify email if a valid key is provided.
class AutoVerifyEmailView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    
    def get(self, request, key, *args, **kwargs):
        try:
            # Try to find the email confirmation using HMAC first
            email_confirmation = EmailConfirmationHMAC.from_key(key)
            if not email_confirmation:
                # If not found, try the regular EmailConfirmation model
                email_confirmation = EmailConfirmation.objects.get(key=key)
            
            # Confirm the email
            email_confirmation.confirm(request)
            return Response({"detail": "Email verified successfully."}, status=200)
        except EmailConfirmation.DoesNotExist:
            return Response({"detail": "Invalid verification key."}, status=400)
        except Exception as e:
            return Response({"detail": str(e)}, status=500)

