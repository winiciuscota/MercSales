from .views import SalesView, SalesViewSet, ProductsListView, ClientsListView
from rest_framework.routers import DefaultRouter
from django.urls import path, include

router = DefaultRouter()
router.register('', SalesViewSet, base_name='sales-vs')

urlpatterns = [
    path('products/', ProductsListView.as_view(),
         name='products-list'),
    path('clients/', ClientsListView.as_view(), name='clients-list'),
    # path('sales/', SalesView.as_view(), name='sales'),
    path('sales/', include(router.urls)),
]
