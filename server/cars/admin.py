from django.contrib import admin
from cars import models


@admin.register(models.Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display=("name",)


@admin.register(models.CarImage)
class CarImageAdmin(admin.ModelAdmin):
    list_display=("car",)


@admin.register(models.CarModel)
class CarModelAdmin(admin.ModelAdmin):
    list_display=("name",)    


@admin.register(models.CarBody)
class CarBodyAdminAdmin(admin.ModelAdmin):
    list_display=("name",)


@admin.register(models.Color)
class ColorAdmin(admin.ModelAdmin):
    list_display=("name",)


@admin.register(models.City)
class CityAdmin(admin.ModelAdmin):
    list_display=("name",)


@admin.register(models.Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    list_display=("name",)


@admin.register(models.GearLever)
class GearLeverAdmin(admin.ModelAdmin):
    list_display=("name",)


@admin.register(models.Transmission)
class TransmissionAdminAdmin(admin.ModelAdmin):
    list_display=("name",)


@admin.register(models.Fuel)
class FuelAdmin(admin.ModelAdmin):
    list_display=("name",)


@admin.register(models.Engine)
class EngineAdmin(admin.ModelAdmin):
    list_display=("volume",)


class CarImageAdminInline(admin.TabularInline):
    model = models.CarImage


@admin.register(models.Car)
class CarAdmin(admin.ModelAdmin):
    inlines= [
        CarImageAdminInline, 
    ]
    list_display= ("user", "made_at", "currency", "price", "distance", "is_active", "car_model", "color", "engine", 'created_at')
    ordering= ("-created_at", )
