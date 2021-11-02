from rest_framework import serializers
from .models import Address


class AddAddresSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = ['country', 'city', 'zip', 'street', 'is_default']
