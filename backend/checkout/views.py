from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from tools.utils import get_user
from .models import Address
from product.models import Order
from .serializers import (
    AddAddresSerializer,
)


class AddAddressAPIView(APIView):
    serializer_class = AddAddresSerializer

    def post(self, request):
        user = get_user(request)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        if request.data['user_default']:
            default_add_qs = Address.objects.filter(user=user, is_default=True)
            if default_add_qs.exists():
                default_add = default_add_qs[0]
                order_qs = Order.objects.filter(user=user, ordered=False)
                if order_qs.exists():
                    order = order_qs[0]
                    order.adress = default_add
                    order.save()
                    return Response({"success": "the default address has been added to your order"}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "You can not add address unless you have an active order"}, status=status.HTTP_404_BAD_REQUEST)
        new_address = serializer.save()
        if request.data['is_default']:
            old_default_qs = Address.objects.filter(user=user, is_default=True)
            if old_default_qs.exists():
                old_default = old_default_qs[0]
                old_default.is_default = False
                old_default.save()
            new_address.is_default = True
            new_address.user = user
            new_address.save()
            return Response({"success": "the address is now default and has been added to your order"}, status=status.HTTP_200_OK)
