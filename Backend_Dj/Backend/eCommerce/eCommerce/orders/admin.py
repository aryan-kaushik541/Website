from django.contrib import admin
from orders.models import Order, CartItem

admin.site.register(Order)
admin.site.register(CartItem)
