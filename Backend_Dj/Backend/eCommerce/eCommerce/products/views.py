from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from products.serializers import ProductSerializer
from products.models import Products


class ProductView(APIView):
    def get(self,request):
        product=Products.objects.all()
        serializer = ProductSerializer(product,many=True)
        return Response(serializer.data)



class ProductDetails(APIView):
    def get(self, request, slug=None):  # <-- Ensure slug is optional
        if not slug:
            return Response({"error": "Slug is required"}, status=400)

        try:
            product = Products.objects.get(slug=slug)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Products.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)
