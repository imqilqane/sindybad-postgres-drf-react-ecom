from django.db.models import base
from django.urls import path
from . import views

app_name = "checkout"

urlpatterns = [
    path('add-address/', views.AddAddressAPIView.as_view(), name="add_address"),
    path('payment/', views.PaymentAPIView.as_view(), name="payment"),
]
