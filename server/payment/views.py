from rest_framework import permissions as rest_permissions, decorators as rest_decorators, response, status

from payment import stripe as stripeContainer

@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def stripeAttachPaymentMethodToCustomer(request):
    try:
        customer = stripeContainer.Stripe.getOrCreateCustomer(user=request.user)

        # validate request
        stripeContainer.Stripe.attachPaymentMethodToCustomer(customerId=customer["id"], paymentMethodId = "")

        return response.Response({"message": "Payment method attached to customer"})
    except:
        return response.Response(status=status.HTTP_400_BAD_REQUEST)