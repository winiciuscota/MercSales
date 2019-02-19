from django.db import models
from enum import Enum


class Product(models.Model):
    name = models.CharField(max_length=100)
    unit_price = models.DecimalField(max_digits=15, decimal_places=2)
    multiple = models.IntegerField(null=True)


class Client(models.Model):
    name = models.CharField(max_length=100)


class Sale(models.Model):
    Client = models.ForeignKey(
        Client, null=True, on_delete=models.SET_NULL, related_name='purchases')


class SaleItem(models.Model):
    sale = models.ForeignKey(
        Sale, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, null=True, on_delete=models.SET_NULL)
    amount = models.IntegerField()
    sale_unit_price = models.DecimalField(max_digits=15, decimal_places=2)
    suggested_unit_price = models.DecimalField(max_digits=15, decimal_places=2)

    @property
    def profitability(self):
        if self.sale_unit_price > self.suggested_unit_price:
            return profitabilities.GREAT
        elif self.sale_unit_price > (self.suggested_unit_price * .9):
            return profitabilities.GOOD
        else:
            return profitabilities.BAD

    @property
    def valid_sale(self):
        return self.amount > 0 and (self.product.multiple == null or (self.amount % self.product.multiple == 0))


class profitabilities(Enum):
    GOOD = 1
    BAD = 2
    GREAT = 3
