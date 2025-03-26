from django.db import models
from accounts.models import User as Customer
from utility.utility import generate_order_id
from products.models import Products



   


class Order(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name="customer_order")
   
    products=models.ForeignKey(Products,on_delete=models.CASCADE,related_name="product_order")
    order_id=models.CharField(max_length=200,null=True,blank=True)
    final_price=models.FloatField()

    def __str__(self):
        return str(self.order_id)
    
    def save(self, *args, **kwargs):
        if not self.pk:
             self.order_id=generate_order_id(Order.objects.count())
        super(Order,self).save(*args, **kwargs)