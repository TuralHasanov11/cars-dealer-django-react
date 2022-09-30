from rest_framework import permissions as rest_permissions, decorators as rest_decorators, response, status, exceptions as apiExceptions
from payment import payment_integrator, config, serializers

@rest_decorators.api_view(['GET'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def cardGetPaymentMethods(request):
    try:
        customer = payment_integrator.CardPayment.getOrCreateCustomer(user=request.user)
        paymentMethods = payment_integrator.CardPayment.getPaymentMethods(customerId=customer["id"])
        return response.Response(paymentMethods)
    except Exception as err:
        return response.Response(str(err), status=status.HTTP_400_BAD_REQUEST) 


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def cardAttachPaymentMethod(request):
    try:
        serializer = serializers.PaymentMethodAttach(data=request.data)
        serializer.is_valid(raise_exception=True)

        customer = payment_integrator.CardPayment.getOrCreateCustomer(user=request.user)
        paymentMethod = payment_integrator.CardPayment.attachPaymentMethod(customerId=customer["id"], paymentMethodId = serializer.validated_data.get("payment_method_id"))

        return response.Response(paymentMethod)
    except Exception as err:
        return response.Response(str(err), status=status.HTTP_400_BAD_REQUEST) 


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def cardCreatePayment(request):
    try:
        customer = payment_integrator.CardPayment.getOrCreateCustomer(user=request.user)
        sessionId = request.POST.get("session_id", None)

        if sessionId:
            payment = payment_integrator.CardPayment.getPayment(paymentId=sessionId)
        else:
            payment = payment_integrator.CardPayment.createPayment(
                payment_integrator.CardPaymentData(
                    amount=config.CarPaymentConfig.AMOUNT.value, 
                    currency= config.CarPaymentConfig.CURRENCY.value, 
                    customer=customer["id"]
                )
            )

        return response.Response(payment)
    except Exception as err:
        return response.Response(str(err), status=status.HTTP_400_BAD_REQUEST) 