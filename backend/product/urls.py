from django.urls import path
from . import views


app_name = 'product'

urlpatterns = [
    path('all/', views.ListProtuctsApiView.as_view(), name="products"),
    path('single/<str:pk>', views.SingleProtuctApiView.as_view(), name="product"),
    path('add-to-cart/<str:pk>', views.AddToCartAPIView.as_view(), name="add"),
    path('remove-from-cart/<str:pk>',
         views.RemoveFromCartAPIView.as_view(), name="remove"),
    path('increase-qts/<str:pk>',
         views.IncreaseItemQtsAPIView.as_view(), name="increase"),
    path('decrease-qts/<str:pk>',
         views.DecreaseItemQtsAPIView.as_view(), name="decrease"),
]
