from django.urls import path
from products.views import ProductView,ProductDetails

urlpatterns = [
    path('',ProductView.as_view(),name="product_view"),
    path('product/<slug>/',ProductDetails.as_view(),name="product_view"),
]