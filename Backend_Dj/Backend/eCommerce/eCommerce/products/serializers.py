from rest_framework import serializers
from products.models import Category,Products,BrandName


class BrandNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = BrandName
        exclude = ['id','created_at','updated_at']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        exclude = ['id','created_at','updated_at']

class ProductSerializer(serializers.ModelSerializer):
    brand = BrandNameSerializer()
    category = CategorySerializer()
    class Meta:
        model=Products
        exclude = ['id','created_at','updated_at']

