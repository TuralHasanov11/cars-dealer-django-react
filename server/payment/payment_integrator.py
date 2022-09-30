from abc import ABC
from dataclasses import dataclass
import os
from django.contrib.auth import get_user_model

@dataclass
class PaymentData(ABC):
    pass

class PaymentIntegrator(ABC):
    pass

### STRIPE
import stripe
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY", None)

@dataclass
class CardPaymentData(PaymentData):
    customer:str
    amount:int
    currency:str 
    
class CardException(Exception):
    pass

class CardPayment(PaymentIntegrator):
    @staticmethod
    def createPayment(data:CardPaymentData):
        try:
            payment = stripe.PaymentIntent.create(
                amount= data.amount,
                currency= data.currency,
                customer= data.customer
            )

            return payment
        except Exception as e:
            raise CardException(e.user_message)
    
    @staticmethod
    def getPayment(paymentId: str):
        try:
            payment = stripe.PaymentIntent.retrieve(paymentId)
            return payment
        except Exception as e:
            raise CardException(e.user_message)
    
    @staticmethod
    def pay(paymentId: str, paymentMethod: str):
        try:
            payment = stripe.PaymentIntent.confirm(
                paymentId,
                payment_method=paymentMethod,
            )

            return payment
        except Exception as e:
            raise CardException(e.user_message)

    @staticmethod
    def getOrCreateCustomer(user: get_user_model()):
        try:
            customer = stripe.Customer.search(
                query=f"email:'{user.email}'",
            )

            if customer["data"]:
                return customer["data"][0]
            
            customer = stripe.Customer.create(
                email=user.email,
                name=user.username,
            )

            return customer
        except Exception as e:
            raise CardException(e.user_message)

    @staticmethod
    def getPaymentMethods(customerId: str, type: str = "card"):
        try:
            paymentMethods = stripe.Customer.list_payment_methods(
                customerId,
                type=type,
            )

            return paymentMethods
        except Exception as e:
            raise CardException(e.user_message)

    @staticmethod
    def attachPaymentMethod(customerId: str, paymentMethodId: str):
        try:
            paymentMethod = stripe.PaymentMethod.attach(
                paymentMethodId,
                customer=customerId,
            )

            return paymentMethod
        except Exception as e:
            raise CardException(e.user_message)
