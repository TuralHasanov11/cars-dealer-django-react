from dataclasses import dataclass
import enum
import stripe
stripe.api_key = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"

@dataclass
class StripePaymentData:
    amount:int
    currency:str 
    payment_method:str
    

class Stripe:
    def pay(self, data:StripePaymentData):
        try:
            payment = stripe.PaymentIntent.create(
                amount= data.amount,
                currency= data.currency,
                payment_method= data.payment_method,
            )

            return payment
        except stripe.error.CardError as e:
            raise Exception(f"A payment error occurred: {e.user_message}")
        except stripe.error.InvalidRequestError:
            raise Exception("An invalid request occurred.")
        except Exception:
            raise Exception("Another problem occurred, maybe unrelated to Stripe.")