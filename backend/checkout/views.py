from stripe.api_resources import customer, payment_method
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from tools.utils import get_user
from .models import Address
from product.models import Order
from .serializers import (
    AddAddresSerializer,
)
import stripe
import random
import string


class AddAddressAPIView(APIView):
    serializer_class = AddAddresSerializer

    def post(self, request):
        user = get_user(request)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            if request.data['use_default']:
                default_add_qs = Address.objects.filter(
                    user=user, is_default=True)
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
        except KeyError:
            new_address = serializer.save()
            if request.data['is_default']:
                old_default_qs = Address.objects.filter(
                    user=user, is_default=True)
                if old_default_qs.exists():
                    old_default = old_default_qs[0]
                    old_default.is_default = False
                    old_default.save()
                new_address.is_default = True
                new_address.user = user
                new_address.save()
                return Response({"success": "the address is now default and has been added to your order"}, status=status.HTTP_200_OK)


def gen_order_number():
    return "".join(random.choices(string.ascii_lowercase + string.digits, k=20))


stripe.api_key = "sk_test_1srueIi8nRsob787g1O3pS0z00NR4rSjbb"


class PaymentAPIView(APIView):
    def post(self, request):
        user = get_user(request)
        order_qs = Order.objects.filter(user=user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            amount = order.get_total() * 100
            payment_method_id = request.data['payment_method_id']

            customers_data = stripe.Customer.list(email=user.email).data

            if len(customers_data) == 0:
                # create customer
                customer = stripe.Customer.create(
                    email=user.email,
                    payment_method=payment_method_id
                )
            else:
                customer = customers_data[0]

            payment = stripe.PaymentIntent.create(
                customer=customer,
                payment_method=payment_method_id,
                currency="usd",
                amount=amount,
                confirm=True
            )

            order.payment = payment
            order.order_number = gen_order_number()
            order.save()

            return Response({'success': 'your payment is being processing'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'order no exists'}, status=status.HTTP_404_BAD_REQUEST)
