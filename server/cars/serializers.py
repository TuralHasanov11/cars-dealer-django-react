from rest_framework import serializers
from cars import models 

class CarUserSerializer(serializers.ModelSerializer):
    profile_user = ProfileSerializer(many=False)

    class Meta:
        model=Account
        fields = ['id', 'username', 'profile_user']


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

    class Meta:
        model = models.Car
        fields = [
            'id','made_at','currency','price','distance',
            'is_active','barter','credit','car_model','city',
            'gear_lever','fuel','engine','created_at', 'is_new', 'car_images'
        ]


class CarDetailSerializer(serializers.ModelSerializer):

    car_model = CarModelSerializer(many=False, read_only=True)
    user = CarUserSerializer(many=False, read_only=True)
    city = CitySerializer(many=False)
    engine = EngineSerializer(many=False)
    car_body = CarBodySerializer(many=False)
    color = ColorSerializer(many=False)
    fuel = FuelSerializer(many=False)
    gear_lever = GearLeverSerializer(many=False)
    transmission = TransmissionSerializer(many=False)
    is_new = serializers.SerializerMethodField()
    equipment = EquipmentSerializer(many=True, read_only=True)

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
        fields = ['currency','price','distance','is_active','barter',
            'credit','description','car_model','car_body','city','color',
            'engine','gear_lever','transmission','fuel','equipment', 'car_images'
        ]
        
    def create(self, validated_data):
        return self.Meta.model.objects.create(**validated_data, user=self.context.get("request").user)

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
        instance.equipment = validated_data.get('equipment', instance.validated_data.get('equipment', instance.fuel))
        instance.car_images = validated_data.get('car_images', instance.validated_data.get('car_images', instance.fuel))

        return instance
    
