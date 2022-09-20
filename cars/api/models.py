from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
import datetime

from account.models import Account


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

    def __str__(self):
        return self.name


class CarBody(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Color(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

    
class Engine(models.Model):
    volume = models.IntegerField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
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
    
    def __str__(self):
        return self.name


class Transmission(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name


class Fuel(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name


class Car(models.Model):
    CURRENCIES = [
        ('azn', 'AZN'),
        ('usd', 'USD'),
        ('eur', 'EUR'),
    ]

    YEAR_CHOICES = [(r,r) for r in range(1984, datetime.date.today().year+1)]
    user = models.ForeignKey(Account, on_delete=models.CASCADE, null=False,related_name='user')
    made_at = models.IntegerField(_('year'), choices=YEAR_CHOICES, default=datetime.date.today().year)
    currency = models.CharField(max_length=3,choices=CURRENCIES,default='azn',)
    price = models.IntegerField(null=False, blank=False, validators = [MinValueValidator(500)])
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
    equipment = models.ManyToManyField(Equipment,related_name="car_equipment")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def is_new(self):
        return self.distance == 0

class CarImage(models.Model):
    TYPES = ['front', 'back', 'panel', 'other']
    image=models.ImageField(upload_to="media/cars")
    car=models.ForeignKey(Car,on_delete=models.CASCADE, related_name="car_images")
    type = models.CharField(max_length=20, choices=TYPES, default='front')

