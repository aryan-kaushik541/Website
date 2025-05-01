# backend/orders/views.py
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from orders.serializers import OrderSerializer, CartItemSerializer
from orders.models import Order, CartItem
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from products.models import Products
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from accounts.models import user_address

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
        product_slugs=request.data.get('product')
        address_id=request.data.get('address_id')
        print(address_id,product_slugs)
        try:
            for product_slug in product_slugs:
            
                product = Products.objects.get(slug=product_slug.get('slug'))
                if product.stock < 1:
                    return Response({"error": "Product is out of stock"}, status=status.HTTP_400_BAD_REQUEST)
                address=user_address.objects.get(pk=address_id)
            
            
                order = Order.objects.create(
                    customer=request.user,
                    address=address,
                    products=product,
                    final_price=product.discount_price,
                    quantity=product_slug.get('quantity')
                )

                product.stock -= 1
                product.save()
                serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Products.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddToCart(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_items = CartItem.objects.filter(customer=request.user)
        # print(cart_items)
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        product_slug = request.data.get('product')
        quantity = request.data.get('quantity', 1)
      
        try:
            product = get_object_or_404(Products, slug=product_slug)
            if product.stock < quantity:
                return Response({"error": "Not enough stock available"}, status=status.HTTP_400_BAD_REQUEST)

            cart_item, created = CartItem.objects.get_or_create(
                customer=request.user,
                product=product,
    
            )
          
            cart_item.quantity = quantity
           
            
            cart_item.save()

            
            return Response({'msg':'product added'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, pk):
        try:
            cart_item = CartItem.objects.get(pk=pk, customer=request.user)
            quantity = request.data.get('quantity')
            print(quantity)
            if quantity is not None and quantity!=0:
                cart_item.quantity = quantity
                cart_item.save()
                serializer = CartItemSerializer(cart_item)
                return Response(serializer.data)
            else:
               
                return Response({"error": "Quantity is required"}, status=status.HTTP_400_BAD_REQUEST)
        except CartItem.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)

    def delete(self, request, pk):
        try:
            item = CartItem.objects.get(pk=pk, customer=request.user)
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

