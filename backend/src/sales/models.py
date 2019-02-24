from django.db import models
from enum import Enum
from django.utils import timezone


class Product(models.Model):
    name = models.CharField(max_length=100)
    unit_price = models.DecimalField(max_digits=15, decimal_places=2)
    multiple = models.IntegerField(null=True)

    def __str__(self):
        return self.name


class Client(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Sale(models.Model):
    client = models.ForeignKey(
        Client, null=True, on_delete=models.SET_NULL, related_name='purchases')
    created_date = models.DateTimeField(default=timezone.now, blank=True)

    # @property
    # def total_value(self):
    #     return sum([x.sale_unit_price for x in self.items])


class SaleItem(models.Model):
    class Meta:
        unique_together = (('sale', 'product'),)
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
        return self.amount > 0 and (self.product.multiple is None or (self.amount % self.product.multiple == 0))

    @property
    def total_value(self):
        return self.amount * sale_unit_price


class profitabilities(Enum):
    GOOD = 1
    BAD = 2
    GREAT = 3
