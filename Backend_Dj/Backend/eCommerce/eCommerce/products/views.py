from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from products.serializers import ProductSerializer
from products.models import Products
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from products.models import Products
from products.serializers import ProductSerializer

class ProductView(APIView):
    def get(self,request):
        product=Products.objects.all()
        serializer = ProductSerializer(product,many=True)
        return Response(serializer.data)



class ProductDetails(APIView):
    def get(self, request, slug):
        product = get_object_or_404(Products, slug=slug)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, slug):
        product = get_object_or_404(Products, slug=slug)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug):
        product = get_object_or_404(Products, slug=slug)
        product.delete()
        return Response({"message": "Product deleted successfully"}, status=status.HTTP_204_NO_CONTENT)