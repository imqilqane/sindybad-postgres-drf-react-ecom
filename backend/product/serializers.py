from rest_framework import serializers
from .models import (
    Category,
    Product,
    OrderedItem,
    Order,
)


class ListProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
