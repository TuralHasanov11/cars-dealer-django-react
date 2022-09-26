from dataclasses import dataclass
import enum


@dataclass
class CarPaymentConfig(enum):
    AMOUNT: int = 20
    class Currencies(enum):
        AZN='azn'
        USD='usd'
        EUR='eur'
    CURRENCY: str = Currencies.AZN