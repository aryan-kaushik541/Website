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
    brand = serializers.PrimaryKeyRelatedField(queryset=BrandName.objects.all())  # Allows passing brand ID
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())  # Allows passing category ID
    brand_detail = BrandNameSerializer(source="brand", read_only=True)  # Read-only brand details
    category_detail = CategorySerializer(source="category", read_only=True)  # Read-only category details

    class Meta:
        model = Products
        fields = [
            "id", "title", "decription", "actual_price", "discount_price", 
            "stock", "front_imges", "back_imges", "slug", "brand", "category", 
            "brand_detail", "category_detail"
        ]
        read_only_fields = ["slug"]  # Slug should be auto-generated

    def create(self, validated_data):
        """Custom create method to handle slug generation"""
        product = Products.objects.create(**validated_data)
        return product

    def update(self, instance, validated_data):
        """Update method to prevent slug modification"""
        validated_data.pop("slug", None)  # Prevent slug updates
        return super().update(instance, validated_data)
