from django.urls import path
from accounts.views import *
# from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
urlpatterns = [
    path('register/',UserRagistrationView.as_view(),name='register'),
    path('activate/<str:uid>/<str:token>/', ActivateAccountView.as_view(), name='activate'),
    path('login/',UserLoginView.as_view(),name='login'),
    path('profile/',UserProfileView.as_view(),name='profile'),
    path('passwordchange/',UserChangePassword.as_view(),name='passwordchange'),
    path('sendpasswordemail/',UserSendPasswordEmail.as_view(),name='sendpasswordemail'),
    path('resetpassword/<uid>/<token>/',UserRestPassword.as_view(),name='resetpassword'),
    path('addaddress/',UserAddressCreate.as_view(),name='resetpassword')
  
]