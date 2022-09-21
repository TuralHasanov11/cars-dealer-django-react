from django.urls import path
from payment import views

app_name='cars'

urlpatterns = [
    path('webhooks/paypal', views.PaypalWebhookView.as_view(), name='paypal_webhook'),
]
