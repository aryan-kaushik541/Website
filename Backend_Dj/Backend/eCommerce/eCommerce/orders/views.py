from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from orders.serializers import OrderSerializer
from orders.models import Order
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from products.models import Products

class ShowOrder(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        try:
            order=Order.objects.get(customer__email=request.user.email)
            serializer = OrderSerializer(order)
            return Response(serializer.data) 
        except Order.DoesNotExist:
            return Response(
                {"error": "You do not have any orders."},
                status=status.HTTP_404_NOT_FOUND
            )
            


class CreateOrder(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):

        product_slug=request.data.get('product')
        try:
            product = Products.objects.get(slug=product_slug)
            if product.stock < 1:
                return Response({"error": "Product is out of stock"}, status=status.HTTP_400_BAD_REQUEST)

            # Create the order
            order = Order.objects.create(
                customer=request.user,
                products=product,
                final_price=product.discount_price,  # Set final price from discount price
            )

            product.stock -= 1
            product.save()
            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Products.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)