from rest_framework import serializers

class PaymentMethodAttach(serializers.Serializer):
  payment_method_id = serializers.CharField()