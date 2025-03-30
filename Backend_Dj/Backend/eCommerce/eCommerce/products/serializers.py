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
    class Meta:
        model = Products
        exclude = ['id', 'created_at', 'updated_at', 'slug']  # Remove slug to generate dynamically

    def create(self, validated_data):
        validated_data['slug'] = get_slug()  # Generate slug when creating product
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'title' in validated_data:
            validated_data['slug'] = get_slug()  # Regenerate slug if title changes
        return super().update(instance, validated_data)