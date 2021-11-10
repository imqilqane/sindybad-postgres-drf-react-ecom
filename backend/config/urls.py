from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # refresh token request
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # apps
    path('api/auth/', include('user.urls', namespace='user')),
    path('api/products/', include('product.urls', namespace='product')),
    path('api/checkout/', include('checkout.urls', namespace='checkout')),
    path('api/refund/', include('refund.urls', namespace='refund')),


]
