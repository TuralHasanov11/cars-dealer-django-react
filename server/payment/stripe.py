from dataclasses import dataclass
from django.conf import settings
import stripe
stripe.api_key = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"
from django.contrib.auth import get_user_model

@dataclass
class StripePaymentData:
    customer:str
    amount:int
    currency:str 
    

class Stripe:
    @staticmethod
    def createPayment(data:StripePaymentData):
        print(data)
        try:
            payment = stripe.PaymentIntent.create(
                amount= data.amount,
                currency= data.currency,
                customer= data.customer
            )

            return payment
        except stripe.error.CardError as e:
            raise Exception(f"A payment error occurred: {e.user_message}")
        except stripe.error.InvalidRequestError as e:
            raise Exception(f"An invalid request occurred: {e.user_message}")
        except Exception:
            raise Exception("Another problem occurred, maybe unrelated to Stripe.")
    
    @staticmethod
    def getPayment(paymentId: str):
        try:
            payment = stripe.PaymentIntent.retrieve(paymentId)
            return payment
        except stripe.error.CardError as e:
            raise Exception(f"A payment error occurred: {e.user_message}")
        except stripe.error.InvalidRequestError as e:
            raise Exception(f"An invalid request occurred: {e.user_message}")
        except Exception:
            raise Exception("Another problem occurred, maybe unrelated to Stripe.")
    
    @staticmethod
    def pay(paymentId: str, paymentMethod: str):
        try:
            payment = stripe.PaymentIntent.confirm(
                paymentId,
                payment_method=paymentMethod,
            )

            return payment
        except stripe.error.CardError as e:
            raise Exception(f"A payment error occurred: {e.user_message}")
        except stripe.error.InvalidRequestError as e:
            raise Exception(f"An invalid request occurred: {e.user_message}")
        except Exception:
            raise Exception("Another problem occurred, maybe unrelated to Stripe.")

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
        except Exception:
            raise Exception("Another problem occurred, maybe unrelated to Stripe.")

    @staticmethod
    def getPaymentMethods(customerId: str, type: str = "card"):
        try:
            paymentMethods = stripe.Customer.list_payment_methods(
                customerId,
                type=type,
            )

            return paymentMethods
        except Exception:
            raise Exception("Another problem occurred, maybe unrelated to Stripe.")

    @staticmethod
    def attachPaymentMethod(customerId: str, paymentMethodId: str):
        try:
            paymentMethod = stripe.PaymentMethod.attach(
                paymentMethodId,
                customer=customerId,
            )

            return paymentMethod
        except Exception:
            raise Exception("Another problem occurred, maybe unrelated to Stripe.")