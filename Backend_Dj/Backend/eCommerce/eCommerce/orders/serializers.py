
# backend/orders/serializers.py
from rest_framework import serializers
from orders.models import Order, CartItem
from products.models import Products
from products.serializers import BrandNameSerializer, CategorySerializer
from accounts.models import User as Customer
from accounts.serializers import AddressSerializer


class CustomerMinimalSerializers(serializers.ModelSerializer):
    

    class Meta:
        model = Customer
        fields = ['name', 'email']


class ProductMinimalSerializer(serializers.ModelSerializer):
    brand = BrandNameSerializer()
    category = CategorySerializer()

    class Meta:
        model = Products
        fields = ['brand', 'category','front_imges','title','discount_price','slug']


class OrderSerializer(serializers.ModelSerializer):
    products = ProductMinimalSerializer()
    customer = CustomerMinimalSerializers()

    class Meta:
        model = Order
        exclude = ['id']



class CartItemSerializer(serializers.ModelSerializer):
    # product_title = serializers.CharField(source="product.title", read_only=True)
    # product_price = serializers.FloatField(source="product.discount_price", read_only=True)
    # product_image = serializers.ImageField(source="product.image", read_only=True)
    product = ProductMinimalSerializer() # Change
    customer =CustomerMinimalSerializers()
 
    class Meta:
        model = CartItem
        fields = ["id", "customer", "product", "quantity"]

