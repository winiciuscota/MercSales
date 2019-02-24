from django.db.models.fields import IntegerField
from rest_framework import serializers

from django.db.models import Sum, F, FloatField
from sales.models import Client, Product, Sale, SaleItem


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = (
            'id',
            'name',
        )


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'unit_price',
            'multiple'
        )


class SaleItemSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(
        source='product', queryset=Product.objects.all(), )
    id = serializers.IntegerField(required=False)

    class Meta:
        model = SaleItem
        fields = (
            'id',
            'product_id',
            'amount',
            'sale_unit_price',
            "suggested_unit_price"
        )
        write_only_fields = ("id", )


class SaleSerializer(serializers.ModelSerializer):
    items = SaleItemSerializer(many=True)
    client_id = serializers.PrimaryKeyRelatedField(
        source='client', queryset=Client.objects.all(), )
    client = ClientSerializer()
    total_value = serializers.SerializerMethodField()

    class Meta:
        model = Sale
        fields = (
            'id',
            'client_id',
            'items',
            'client',
            'total_value'
        )
        read_only_fields = ("client", "total_value")

    def get_total_value(self, obj):
        return obj.items.aggregate(total_value=Sum(F('amount') * F('sale_unit_price'), output_field=FloatField()))['total_value']

    def create(self, validated_data):
        items = validated_data.pop('items')
        sale = Sale.objects.create(**validated_data)

        for item in items:
            SaleItem.objects.create(**item, sale=sale)

        return sale

    def update(self, instance, validated_data):
        instance.client = validated_data.get('client', instance.client)
        instance.save()
        sale_items = instance.items.all()
        items = validated_data.get('items')

        for item in items:
            sale_item = next(
                (iter(x for x in sale_items if x.product.id == item["product"].id)), None)
            # If the item is both in the list of items and in the database then it is being edited
            if sale_item:
                sale_item.amount = item.get('amount')
                sale_item.sale_unit_price = item.get('sale_unit_price')
                sale_item.save()
            else:
                SaleItem.objects.create(sale=instance, **item)

        # Get items that were removed
        product_ids = [x.get("product").id for x in items]
        removed_items = [
            x for x in sale_items if x.product.id not in product_ids]

        for removed_item in removed_items:
            removed_item.delete()

        return instance
