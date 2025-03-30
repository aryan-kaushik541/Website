from django.db import models
from django.utils.text import slugify
from utility.utility import get_slug  # Ensure this function properly generates slugs

class BaseModel(models.Model):
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
    brand = models.ForeignKey(BrandName, on_delete=models.CASCADE, related_name="product_brand")
    title = models.CharField(max_length=100)
    decription = models.TextField()
    actual_price = models.FloatField()
    discount_price = models.FloatField()
    stock = models.IntegerField()
    front_imges = models.ImageField(upload_to="products/images/")
    back_imges = models.ImageField(upload_to="products/images/", blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True)

    def __str__(self):
        return f"{self.brand} , ({self.title})"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = get_slug(self.title)  # Ensure get_slug() takes title input
        super().save(*args, **kwargs)
