from django.db import models
from django.contrib.auth.models import User
class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=200)
    price = models.DecimalField(decimal_places=2, max_digits=5)
    image = models.ImageField(upload_to='images/')

class Order(models.Model):
    username = models.CharField(max_length=150,default='mujtaba')
    products = models.ManyToManyField(Product) 
    total_price = models.DecimalField(decimal_places=2, max_digits=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order by {self.user.username} on {self.created_at}"
