from rest_framework import serializers
from orders.models import Order

from products.models import Products
from products.serializers import BrandNameSerializer,CategorySerializer
from accounts.models import User as Customer
from accounts.serializers import AddressSerializer



class CustomerMinimalSerializers(serializers.ModelSerializer):
    address=AddressSerializer()
    class Meta:
        model=Customer
        fields=['name','email','address']


class ProductMinimalSerializer(serializers.ModelSerializer):
    brand=BrandNameSerializer()
    category=CategorySerializer()
    class Meta:
        model=Products
        fields=['brand','category']


class OrderSerializer(serializers.ModelSerializer):
    
    products=ProductMinimalSerializer()
    customer=CustomerMinimalSerializers()

    class Meta:
        model=Order
        exclude = ['id']