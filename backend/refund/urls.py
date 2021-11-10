from django.urls import path
from . import views

app_name = "refund"

urlpatterns = [
    path('', views.RefundAPIView.as_view(), name='refund'),
]
