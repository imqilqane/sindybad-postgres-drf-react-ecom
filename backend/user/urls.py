from django.urls import path
from . import views

app_name = "user"

urlpatterns = [
    path('register/', views.RegisterAPIView.as_view(), name="register"),
    path('login/', views.LoginAPIView.as_view(), name="login"),
    path('register/verify/', views.VerifyACountAPIView.as_view(), name="verify"),
    path('request-new-password/',
         views.RequestNewPassWordAPIView.as_view(), name="request_new"),
    path('reset-password/<str:uidb64>/<str:token>/',
         views.ResetPassWordAPIView.as_view(), name="reset_pass"),
]
