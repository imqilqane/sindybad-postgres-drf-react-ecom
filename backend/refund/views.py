from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Refund
from product.models import Order
from tools.utils import get_user
from .serializers import RefundSerializer


class RefundAPIView(APIView):
    serializer_class = RefundSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(rais_exception=True)
        order_number = request.data['order_number']
        user = get_user(request)
        order_qs = Order.objects.filter(
            user=user, ordered=True, order_number=order_number)
        if order_qs.exists():
            order = order_qs[0]
            order.in_refund = True
            order.save()
            refund = Refund.objects.create(
                user=user,
                order=order,
                reasone=request.data['reasone'],
            )
            refund.in_review = True
            refund.save()
            return Response({"success": "your refund request is under review"}, status=status.HTTP_200_OK)
        else:
            return Response({"Error": "The order_number dosn't belown to any order"}, status=status.HTTP_404_BAD_REQUEST)
