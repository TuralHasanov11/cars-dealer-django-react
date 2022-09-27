from rest_framework import permissions as rest_permissions, decorators as rest_decorators, response, status

from payment import stripe as stripeContainer, serializers
from payment import config


@rest_decorators.api_view(['GET'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def stripeGetPaymentMethods(request):
    try:
        customer = stripeContainer.Stripe.getOrCreateCustomer(user=request.user)

        paymentMethods = stripeContainer.Stripe.getPaymentMethods(customerId=customer["id"])

        return response.Response(paymentMethods)
    except Exception as err:
        return response.Response(str(err), status=status.HTTP_400_BAD_REQUEST)


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def stripeAttachPaymentMethod(request):
    try:
        serializer = serializers.PaymentMethodAttach(request.data)
        serializer.is_valid(raise_exception=True)

        customer = stripeContainer.Stripe.getOrCreateCustomer(user=request.user)
        paymentMethod = stripeContainer.Stripe.attachPaymentMethod(customerId=customer["id"], paymentMethodId = serializer.validated_data.get("payment_method_id"))

        return response.Response(paymentMethod)
    except Exception as err:
        return response.Response(str(err), status=status.HTTP_400_BAD_REQUEST)


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def stripeCreatePayment(request):
    try:
        customer = stripeContainer.Stripe.getOrCreateCustomer(user=request.user)
        sessionId = request.POST.get("session_id", None)

        if sessionId:
            payment = stripeContainer.Stripe.getPayment(paymentId=sessionId)
        else:
            payment = stripeContainer.Stripe.createPayment(
                stripeContainer.StripePaymentData(
                    amount=config.CarPaymentConfig.AMOUNT.value, 
                    currency= config.CarPaymentConfig.CURRENCY.value, 
                    customer=customer["id"]
                )
            )

        return response.Response(payment)
    except Exception as err:
        return response.Response(str(err), status=status.HTTP_400_BAD_REQUEST)