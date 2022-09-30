from django.urls import path
from payment import views

app_name='payment'

urlpatterns = [
    path('card/payment-methods', views.cardGetPaymentMethods),
    path('card/create-payment', views.cardCreatePayment),
    path('card/payment-methods/attach', views.cardAttachPaymentMethod),
]
