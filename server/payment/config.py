from enum import Enum


class CarPaymentConfig(Enum):
    AMOUNT: int = 2000
    class Currencies(Enum):
        AZN='azn'
        USD='usd'
        EUR='eur'
    CURRENCY: str = Currencies.AZN.value