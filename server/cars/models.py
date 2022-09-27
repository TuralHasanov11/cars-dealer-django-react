from django.db import models
from django.core import validators
from django.utils.translation import gettext_lazy as _
import datetime
from django.conf import settings


class Brand(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class CarModel(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT, related_name='brand')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Car Brand Model")
        verbose_name_plural = _("Car Brand Models")

    def __str__(self):
        return self.name


class CarBody(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Car Body")
        verbose_name_plural = _("Car Bodies")

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _("City")
        verbose_name_plural = _("Cities")

    def __str__(self):
        return self.name


class Color(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Color")
        verbose_name_plural = _("Colors")
    
    def __str__(self):
        return self.name

    
class Engine(models.Model):
    volume = models.IntegerField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Engine")
        verbose_name_plural = _("Engines")
    
    def __str__(self):
        return str(self.volume)


class Equipment(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _("Equipment")
        verbose_name_plural = _("Equipment")

    def __str__(self):
        return self.name


class GearLever(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Gear Lever")
        verbose_name_plural = _("Gear Levers")
    
    def __str__(self):
        return self.name


class Transmission(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Transmission")
        verbose_name_plural = _("Transmissions")
    
    def __str__(self):
        return self.name


class Fuel(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Fuel")
        verbose_name_plural = _("Fuels")
    
    def __str__(self):
        return self.name

class CarManager(models.Manager):
    def get_queryset(self):
        return super(CarManager, self).get_queryset().filter(is_active=True)

class Car(models.Model):
    class Currencies(models.TextChoices):
        AZN = 'azn', _('AZN')
        USD = 'usd', _('USD')
        EUR = 'eur', _('EUR')

    YEAR_CHOICES = [(r,r) for r in range(1984, datetime.date.today().year+1)]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False, related_name='user')
    wishlist = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="user_wishlist", blank=True)
    made_at = models.IntegerField(_('year'), choices=YEAR_CHOICES, default=datetime.date.today().year)
    currency = models.CharField(max_length=3,choices=Currencies.choices, default=Currencies.AZN,)
    price = models.IntegerField(null=False, blank=False, validators = [validators.MinValueValidator(500)])
    distance = models.IntegerField(null=False, blank=False, default=0)
    is_active = models.BooleanField(default=False)
    barter = models.BooleanField(default=False)
    credit = models.BooleanField(default=False)
    description = models.TextField(null=True, blank=True)
    car_model = models.ForeignKey(CarModel, on_delete=models.PROTECT, related_name='car_model')
    car_body = models.ForeignKey(CarBody, on_delete=models.PROTECT, related_name='car_body')
    city = models.ForeignKey(City, on_delete=models.PROTECT, related_name='city')
    color = models.ForeignKey(Color, on_delete=models.PROTECT, related_name='color')
    engine = models.ForeignKey(Engine, on_delete=models.PROTECT, related_name='engine')
    gear_lever = models.ForeignKey(GearLever, on_delete=models.PROTECT, related_name='gear_lever')
    transmission = models.ForeignKey(Transmission, on_delete=models.PROTECT, related_name='transmission')
    fuel = models.ForeignKey(Fuel, on_delete=models.PROTECT, related_name='fuel')
    equipment = models.ManyToManyField(Equipment, related_name="car_equipment")
    payment_id = models.CharField(verbose_name="Payment ID", max_length=30, null=False, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = models.Manager()
    cars = CarManager()

    class Admin:
        manager = models.Manager()

    @property
    def is_new(self):
        return self.distance == 0

class CarImage(models.Model):
    class ImageTypes(models.TextChoices):
        FRONT = 'front', _('Front View')
        BACK = 'back', _('Back View')
        PANEL = 'panel', _('Front Panel View')
        OTHER = 'other', _('Others')
    image= models.ImageField(upload_to="cars")
    car= models.ForeignKey(Car,on_delete=models.CASCADE, related_name="car_images")
    type= models.CharField(max_length=20, choices=ImageTypes.choices, default=ImageTypes.FRONT)

    @property
    def is_front(self):
        return self.type == self.ImageTypes.FRONT

    @property
    def is_back(self):
        return self.type == self.ImageTypes.BACK

    @property
    def is_panel(self):
        return self.type == self.ImageTypes.PANEL

    