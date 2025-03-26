from django.db import models
from utility.utility import get_slug
class BaseModel(models.Model):
    # This is an abstract class that will be inherited by other models to avoid redundancy
    class Meta:
        abstract = True
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Category(BaseModel):
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name


class BrandName(BaseModel):
    name = models.CharField(max_length=100)
    def __str__(self) -> str:
        return self.name


class Products(BaseModel):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="product_category")
    brand = models.ForeignKey(BrandName,on_delete=models.CASCADE,related_name="product_brand")
    title = models.CharField(max_length=100)
    decription = models.TextField()
    actual_price = models.FloatField()
    discount_price = models.FloatField()
    stock = models.IntegerField()
    front_imges = models.ImageField(upload_to="products/images/")
    back_imges = models.ImageField(upload_to="products/images/")
    slug = models.SlugField(unique=True)

    def __str__(self):
        return f"{self.brand} , ({self.title})"
    
    def save(self,*args,**kwargs):
        if not self.pk:
            self.slug = get_slug()
        super().save(*args,**kwargs)
    
    
    