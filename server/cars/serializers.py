from rest_framework import serializers
from cars import models
from account import serializers as accountSerializers
from payment import stripe, config

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Brand
        fields = ['id','name']


class CarModelSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(many=False, read_only=True)

    class Meta:
        model = models.CarModel
        fields = ['id','name','brand']


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Equipment
        fields = ['id','name']

class CarImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CarImage
        fields = ['id','image', 'type', 'is_front', 'is_back', 'is_panel']

class CarImageCreateUpdateSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = models.CarImage
        fields = ['image']

class CarBodySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CarBody
        fields = ['id','name']

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.City
        fields = ['id','name']

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Color
        fields = ['id','name']

class EngineSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Engine
        fields = ['id','volume']


class GearLeverSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.GearLever
        fields = ['id','name']

class TransmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transmission
        fields = ['id','name']

class FuelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Fuel
        fields = ['id','name']

class CarListSerializer(serializers.ModelSerializer):

    car_model = CarModelSerializer(many=False, read_only=True)
    city = serializers.StringRelatedField(many=False)
    engine = serializers.StringRelatedField(many=False)
    gear_lever = serializers.StringRelatedField(many=False)
    fuel = serializers.StringRelatedField(many=False)
    car_images = CarImageSerializer(many=True, read_only=True)

    class Meta:
        model = models.Car
        fields = [
            'id','made_at','currency','price','distance',
            'is_active','barter','credit','car_model','city',
            'gear_lever','fuel','engine','created_at', 'is_new', 'car_images'
        ]


class CarDetailSerializer(serializers.ModelSerializer):

    car_model = CarModelSerializer(many=False, read_only=True)
    user = accountSerializers.AccountSecondarySerializer(many=False, read_only=True)
    city = serializers.StringRelatedField(many=False)
    engine = serializers.StringRelatedField(many=False)
    gear_lever = serializers.StringRelatedField(many=False)
    fuel = serializers.StringRelatedField(many=False)
    gear_lever = serializers.StringRelatedField(many=False)
    transmission = serializers.StringRelatedField(many=False)
    is_new = serializers.SerializerMethodField()
    equipment = EquipmentSerializer(many=True, read_only=True)
    car_images = CarImageSerializer(many=True, read_only=True)

    class Meta:
        model = models.Car
        fields = [
            'id','made_at','currency','price','distance',
            'is_active','barter','credit','car_model','city','engine',
            'created_at', 'car_body', 'color', 'fuel', 'gear_lever',
            'transmission', 'description', 'is_new', 'equipment', 
            'is_new', 'user', 'car_images'
        ]
    
    def get_is_new(self, obj):
        return obj.distance == 0

class CarCreateUpdateSerializer(serializers.ModelSerializer):

    equipment = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Equipment.objects.all())

    class Meta:
        model = models.Car
        fields = [
            'currency','price','distance','is_active','barter','made_at',
            'credit','description','car_model','car_body','city','color',
            'engine','gear_lever','transmission','fuel','equipment', 
        ]
        
    def create(self, validated_data):

        # payment = stripe.Stripe.pay(
        #     paymentMethod=self.context.get("request").data["payment_method_id"], 
        #     paymentId=self.context.get("request").data["payment_id"]
        # )             

        equipment = validated_data.pop("equipment", None)
        car = models.Car.objects.create(
            **validated_data, 
            user=self.context.get("request").user, 
            # payment_id=payment["id"]
            payment_id="pm_1LmupALv560bXuLqXYWU2cp"
        )
        for item in equipment:
            car.equipment.add(item)
        
        self.uploadCarImages(instance=car, images=self.context['request'].FILES, created=True)
            
        return car
    
    def update(self, instance, validated_data):
        instance.currency = validated_data.get('currency', instance.currency)
        instance.price = validated_data.get('price', instance.price)
        instance.distance = validated_data.get('distance', instance.distance)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.barter = validated_data.get('barter', instance.barter)
        instance.credit = validated_data.get('credit', instance.credit)
        instance.description = validated_data.get('description', instance.description)
        instance.car_model = validated_data.get('car_model', instance.car_model)
        instance.car_body = validated_data.get('car_body', instance.car_body)
        instance.city = validated_data.get('city', instance.city)
        instance.color = validated_data.get('color', instance.color)
        instance.engine = validated_data.get('engine', instance.engine)
        instance.gear_lever = validated_data.get('gear_lever', instance.gear_lever)
        instance.transmission = validated_data.get('transmission', instance.transmission)
        instance.fuel = validated_data.get('fuel', instance.fuel)
        instance.made_at = validated_data.get('made_at', instance.made_at)

        equipment = validated_data.pop("equipment", None)
        instance.equipment.clear()
        for item in equipment:
            instance.equipment.add(item)                

        self.uploadCarImages(instance=instance, images=self.context['request'].FILES, created=False)

        return instance

    def uploadCarImages(self, instance, images, created=False):
        if created:
            try:
                models.CarImage.objects.create(car=instance, image=images["front_image"], type=models.CarImage.ImageTypes.FRONT)
                models.CarImage.objects.create(car=instance, image=images["back_image"], type=models.CarImage.ImageTypes.BACK)
                models.CarImage.objects.create(car=instance, image=images["panel_image"], type=models.CarImage.ImageTypes.PANEL)
            
                if "other_images" in images:
                    for image_data in images["other_images"]:
                        models.CarImage.objects.create(car=instance, image=image_data, type=models.CarImage.ImageTypes.OTHER)
            except Exception as err:
                raise Exception("Images not uploaded")
        else:
            try:
                if 'front_image' in images:
                    models.CarImage.objects.filter(car=instance, type=models.CarImage.ImageTypes.FRONT).delete()
                    models.CarImage.objects.create(car=instance, image=images['front_image'], type=models.CarImage.ImageTypes.FRONT)
                if 'back_image' in images:
                    models.CarImage.objects.filter(car=instance, type=models.CarImage.ImageTypes.BACK).delete()
                    models.CarImage.objects.create(car=instance, image=images['back_image'], type=models.CarImage.ImageTypes.BACK)
                if 'panel_image' in images:
                    models.CarImage.objects.filter(car=instance, type=models.CarImage.ImageTypes.PANEL).delete()
                    models.CarImage.objects.create(car=instance, image=images['panel_image'], type=models.CarImage.ImageTypes.PANEL)
                if 'other_images' in images:
                    models.CarImage.objects.filter(car=instance, type=models.CarImage.ImageTypes.OTHER).delete()
                    for image_data in images['other_images']:
                            models.CarImage.objects.create(car=instance, image=image_data, type=models.CarImage.ImageTypes.OTHER)
            except Exception as err:
                raise Exception("Images not uploaded")
    