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
    def get(self,request,slug):
        product=Products.objects.get(slug=slug)
        serializer = ProductSerializer(product)
        return Response(serializer.data)