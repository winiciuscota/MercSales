from rest_framework.generics import ListAPIView
from sales.models import Client, Product
from sales.serializers import ClientSerializer, ProductSerializer

# Create your views here.


class ClientsListView(ListAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class ProductsListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
