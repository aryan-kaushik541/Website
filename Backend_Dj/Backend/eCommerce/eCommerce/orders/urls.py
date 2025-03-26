from django.urls import path
from orders.views import ShowOrder,CreateOrder

urlpatterns = [
   path('showorder/',ShowOrder.as_view(),name="showorder"),
   path('createorder/',CreateOrder.as_view(),name="createorder")
]