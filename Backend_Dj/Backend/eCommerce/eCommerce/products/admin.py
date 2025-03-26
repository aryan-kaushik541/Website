from django.contrib import admin
from products.models import Products,Category,BrandName


admin.site.register(Products)
admin.site.register(Category)
admin.site.register(BrandName)