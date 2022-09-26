from django.urls import path
from payment import views

app_name='payment'

urlpatterns = [
    path('paypal/webhooks', views.PaypalWebhookView.as_view(), name='paypal_webhook'),
    path('stripe/payment-methods/attach', views.attachPaymentMethodToCustomer, name='stripe_payment_methods_attach'),
]
