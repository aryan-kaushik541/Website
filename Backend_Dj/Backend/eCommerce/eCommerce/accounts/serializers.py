from rest_framework import serializers
from accounts.models import User,user_address
from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from accounts.utils import Util






class UserRagistrationSerializers(serializers.ModelSerializer):
    # we are writing this becoz we need confirm password fields in our Ragistration Request
    password2=serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model=User
        fields=['email','name','password','password2','terms_condition']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }
    # Validate Password and Confirm password While Ragistration
    def validate(self,data):
        
        password=data.get('password')
        password2=data.pop('password2')
        if password==password2:
            return data
        raise serializers.ValidationError(detail="Password and Confirm Password does't match")

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
        
class UserLoginSerializers(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255)
    class Meta:
        model=User
        fields=['email','password']

    

class UserProfileSerializers(serializers.ModelSerializer):
    # address=AddressSerializer()
    class Meta:
        model=User
        fields=['id','name','email']


class UserChangePasswordSerializers(serializers.ModelSerializer):
    password=serializers.CharField(style={'input_type':'password'},write_only=True,max_length=255)
    password2=serializers.CharField(style={'input_type':'password'},write_only=True,max_length=255)
    class Meta:
        model=User
        fields=['password','password2']

    def validate(self,data):
        password=data.get('password')
        password2=data.pop('password2')
        user=self.context.get('user')
        if password==password2:
            user.set_password(password)
            user.save()
            return data
        raise serializers.ValidationError(detail="Password and Confirm Password does't match")

class UserSendPasswordEmailSerializers(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255)
    class Meta:
        model=User
        fields=['email']

    def validate(self,data):
        email=data.get('email')
        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)
            # convert into bytes
            byte=force_bytes(user.id)
            # store in uid in encode form of id stored in user object (urlsafe_base64_encode() takes in bytes )
            uid=urlsafe_base64_encode(byte) 
            # print("Encoded uid : ",uid)
            # to generate token
            
            token=PasswordResetTokenGenerator().make_token(user)
            
            # link=f'http://127.0.0.1:8000/api/user/resetpassword/{uid}/{token}'
            link=f'http://localhost:5173/resetPassword/{uid}/{token}'
            # print(link)
            # send emali
        
            Util.send_email(data={'email_subject':'Rest Password','message':link,'recipient_list':user.email})
            
            return data
        raise serializers.ValidationError(detail="Invalil Email Id! Check Your Email Properly")

class UserRestPasswordSerializers(serializers.ModelSerializer):
    password=serializers.CharField(style={'input_type':'password'},write_only=True,max_length=255)
    password2=serializers.CharField(style={'input_type':'password'},write_only=True,max_length=255)

    class Meta:
        model=User
        fields=['password','password2']

    def validate(self,data):
        try:
            password=data.get('password')
            password2=data.pop('password2')
            # encoded form
            uid=self.context.get('uid')
            token=self.context.get('token')
            # decoded id and token
            byte_uid=urlsafe_base64_decode(uid)
            dcode_uid=smart_str(byte_uid) #  readeble
            # print(dcode_uid)
                
            if password==password2:
                user=User.objects.get(id=dcode_uid)
                # print(PasswordResetTokenGenerator().check_token(user,token))
                if PasswordResetTokenGenerator().check_token(user,token):
                    user.set_password(password)
                    user.save()
                    return data
                raise serializers.ValidationError(detail="Token is not valid or expired")
            raise serializers.ValidationError(detail="Password and Confirm Password does't match")
        except DjangoUnicodeDecodeError:
            PasswordResetTokenGenerator().check_token(user,token)
            raise serializers.ValidationError(detail="Token is not valid or expired")


class AddressSerializer(serializers.ModelSerializer):
    user=UserProfileSerializers(many=True,read_only=True)
    class Meta:
        model=user_address
        # exclude=['id']
        fields="__all__"

   
    
    def create(self, validated_data):
        user = self.context['request'].user
 
        address,_=user_address.objects.get_or_create(**validated_data) 
        user_instance=User.objects.get(email=user)
        address.user.add(user_instance)
        return address 