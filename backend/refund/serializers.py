from rest_framework import serializers


class RefundSerializer(serializers.Serializer):
    order_number = serializers.CharField(max_length=20)
    reason = serializers.CharField(max_length=500)

    class Meta:
        fields = ['order_number', 'reason']
