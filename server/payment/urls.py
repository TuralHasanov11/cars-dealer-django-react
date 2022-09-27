from django.urls import path
from payment import views

app_name='payment'

urlpatterns = [
    path('stripe/payment-methods', views.stripeGetPaymentMethods),
    path('stripe/create-payment', views.stripeCreatePayment),
    path('stripe/payment-methods/attach', views.stripeAttachPaymentMethod),
]
