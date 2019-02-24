from rest_framework.generics import ListAPIView
from sales.models import Client, Product, Sale
from .serializers import ClientSerializer, ProductSerializer, SaleSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status


class ClientsListView(ListAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class ProductsListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class SalesView(APIView):

    def post(self, request):
        serializer = SaleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SalesViewSet(viewsets.ModelViewSet):
    serializer_class = SaleSerializer
    queryset = Sale.objects.all()
