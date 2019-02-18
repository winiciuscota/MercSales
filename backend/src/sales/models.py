from django.db import models

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=100)
    unit_price = models.DecimalField(decimal_places=2)
    multiple = models.IntegerField(null=True)


class Client(models.Model):
    name = models.CharField(max_length=100)


class Sale(model.Model):
    Client = models.ForeignKey(
        Client, on_delete=models.SET_NULL, related_name='purchases')


class SaleItem(model.Model):
    sale = models.ForeignKey(
        Sale, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL)
    amount = models.IntegerField()
    unit_price = models.DecimalField(decimal_places=2)
    suggested_price = models.DecimalField(decimal_places=2)
