from django.contrib import admin
from cars import models

class BrandAdmin(admin.TabularInline):
    model = models.Brand

class CarModelAdmin(admin.TabularInline):
    model = models.CarModel

class CarBodyAdmin(admin.TabularInline):
    model = models.CarBody

class ColorAdmin(admin.TabularInline):
    model = models.Color

class CityAdmin(admin.TabularInline):
    model = models.City

class EquipmentAdmin(admin.TabularInline):
    model = models.Equipment

class GearLeverAdmin(admin.TabularInline):
    model = models.GearLever

class TransmissionAdmin(admin.TabularInline):
    model = models.Transmission

class FuelAdmin(admin.TabularInline):
    model = models.Fuel

class CarImageAdmin(admin.TabularInline):
    model = models.CarImage

admin.site.register(models.Car)
class CarAdmin(admin.ModelAdmin):
    inlines= [
        CarModelAdmin, TransmissionAdmin, FuelAdmin, 
        GearLeverAdmin, EquipmentAdmin, CityAdmin, ColorAdmin, 
        CarBodyAdmin, CarModelAdmin, CarImageAdmin
    ]
    list_display= ("user", "made_at", "currency", "price", "distance", "is_active", "car_model", "color", "engine",)
    ordering= ("-created_at", )
