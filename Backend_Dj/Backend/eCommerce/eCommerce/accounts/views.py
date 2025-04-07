from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from accounts.serializers import *
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
# from api.renderers import UserRenderer
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.urls import reverse
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator


# Generate Token Manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
class UserRagistrationView(APIView):
    # renderer_classes = [UserRenderer] set in settings.py
    def post(self,request):
        serializer=UserRagistrationSerializers(data=request.data)
        
        if serializer.is_valid():
            user=serializer.save()
            user.is_active = False 
            user.save()
            # token=get_tokens_for_user(user)
            uid=urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
         
            # Reverse the correct URL
            activate_link = reverse('activate', kwargs={'uid': uid, 'token': token})
            activate_url = f'{settings.SITE_DOMAIN}{activate_link}'
            # link=f'http://127.0.0.1:8000/api/account/activate/{uid}/{token}'
            print(activate_url)
            Util.send_email(data={'email_subject':'register','message':activate_url,'recipient_list':user.email})
            return Response({'token':token,'msg':'RagisterSuccessFull Check your email to activate your account.'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class ActivateAccountView(APIView):
    def get(self, request, uid, token):
        try:
            uid = urlsafe_base64_decode(uid).decode()
            user = User.objects.get(id=uid)
            if PasswordResetTokenGenerator().check_token(user, token):
                user.is_active = True
                user.save()
                return Response({'msg': 'Account activated successfully'}, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Activation failed'}, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializers(data=request.data)
        if serializer.is_valid():
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            
            # Authenticate user
            user = authenticate(email=email, password=password)

            if user is not None:
                token = get_tokens_for_user(user)

                if user.is_staff:  # ✅ If user is admin, send additional flag
                    return Response({'token': token, 'msg': 'Admin Login Successful', 'is_admin': True}, status=status.HTTP_200_OK)

                return Response({'token': token, 'msg': 'User Login Successful', 'is_admin': False}, status=status.HTTP_200_OK)

            return Response({'errors': {'non_field_errors': ['Invalid email or password']}}, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_staff:
            return Response({'error': 'Unauthorized access'}, status=status.HTTP_403_FORBIDDEN)

        return Response({'msg': 'Welcome to the Admin Dashboard', 'admin_name': request.user.get_full_name()}, status=status.HTTP_200_OK)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,format=None):
        serializer=UserProfileSerializers(request.user) # request.user means current user
        return Response(serializer.data,status=status.HTTP_200_OK)

class UserChangePassword(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,format=None):
        serializer=UserChangePasswordSerializers(data=request.data,context={
            'user':request.user,
        })
        if serializer.is_valid():
            return Response({'msg':'Password Change Successfull!'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserSendPasswordEmail(APIView):
    def post(self,request,format=None):
        serializer=UserSendPasswordEmailSerializers(data=request.data)
        if serializer.is_valid():
            return Response({'msg':'Check Your Mail'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class UserRestPassword(APIView):
    def post(self,request,uid,token,format=None):
        serializer=UserRestPasswordSerializers(data=request.data,context={
            'uid':uid,
            'token':token
        })
        if serializer.is_valid():
            return Response({'msg':'Password Change Successfull!'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

class UserAddressCreate(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
    
        serializer = AddressSerializer(data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()

            return Response({'msg':'Address Added Successfully'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def get(self,request):
        addresses = user_address.objects.filter(user=request.user)
      
        serializer = AddressSerializer(addresses,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

