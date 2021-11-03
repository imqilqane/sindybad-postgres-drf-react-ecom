from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from tools.utils import get_user
from user.models import User
from .models import (
    Category,
    Product,
    OrderedItem,
    Order,
)
from .serializers import (
    ListProductSerializer,
)


class ListProtuctsApiView(generics.ListAPIView):
    serializer_class = ListProductSerializer
    queryset = Product.objects.all()


class SingleProtuctApiView(APIView):
    serializer_class = ListProductSerializer
    queryset = Product.objects.all()

    def get_query(self, pk):
        try:
            return Product.objects.get(slug=pk)
        except:
            return Product.objects.get(id=pk)

    def get(self, request, pk):
        serializer = self.serializer_class(self.get_query(pk), many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddToCartAPIView(APIView):
    permession_classes = [permissions.IsAuthenticated]
    def get(self, request, pk):
        user = get_user(request)
        item = get_object_or_404(Product, id=pk)
        order_qs = Order.objects.filter(user=user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            order_item_qs = OrderedItem.objects.filter(
                user=user, item=item, ordered=False)
            if order_item_qs.exists():
                order_item = order_item_qs[0]
                order_item.quantity += 1
                order_item.save()
                return Response({"Success": "this item quantity has been updated"}, status=status.HTTP_200_OK)
            else:
                order_item = OrderedItem.objects.create(user=user, item=item)
                order.items.add(order_item)
                order.save()
                return Response({"Success": "this item has been added to your cart"}, status=status.HTTP_200_OK)

        else:
            order = Order.objects.create(user=user)
            order_item = OrderedItem.objects.create(user=user, item=item)
            order.items.add(order_item)
            order.save()
            return Response({"Success": "this item has been added to your cart"}, status=status.HTTP_200_OK)


class RemoveFromCartAPIView(APIView):
    permession_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        user = get_user(request)
        item = get_object_or_404(Product, id=pk)
        order_qs = Order.objects.filter(user=user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            order_item_qs = OrderedItem.objects.filter(
                user=user, item=item, ordered=False)
            if order_item_qs.exists():
                order_item = order_item_qs[0]
                order.items.remove(order_item)
                order_item.delete()
                order.save()
                return Response({"Success": "this item has been removed from your cart"}, status=status.HTTP_200_OK)

            else:
                return Response({"error": "this item is not in your cart"}, status=status.HTTP_404_BAD_REQUEST)
        else:
            return Response({"error": "you don't have any active orders"}, status=status.HTTP_404_BAD_REQUEST)


class DecreaseItemQtsAPIView(APIView):
    permession_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        user = get_user(request)
        item = get_object_or_404(Product, id=pk)
        order_qs = Order.objects.filter(user=user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            order_item_qs = OrderedItem.objects.filter(
                user=user, item=item, ordered=False)
            if order_item_qs.exists():
                order_item = order_item_qs[0]
                if order_item.quantity > 1:
                    order_item.quantity -= 1
                    order_item.save()
                    return Response({"Success": "this item quantity has been updated"}, status=status.HTTP_200_OK)

                else:
                    order.remove(order_item)
                    order_item.delete()
                    order.save()
                    return Response({"Success": "this item has been removed from your cart"}, status=status.HTTP_200_OK)

            else:
                return Response({"error": "this item is not in your cart"}, status=status.HTTP_404_BAD_REQUEST)
        else:
            return Response({"error": "you don't have any active orders"}, status=status.HTTP_404_BAD_REQUEST)


class IncreaseItemQtsAPIView(APIView):
    permession_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        user = get_user(request)
        item = get_object_or_404(Product, id=pk)
        order_qs = Order.objects.filter(user=user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            order_item_qs = OrderedItem.objects.filter(
                user=user, item=item, ordered=False)
            if order_item_qs.exists():
                order_item = order_item_qs[0]
                order_item.quantity += 1
                order_item.save()
                return Response({"Success": "this item quantity has been updated"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "you don't have any active orders"}, status=status.HTTP_404_BAD_REQUEST)
