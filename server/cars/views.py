from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions as rest_permissions
from cars import models, serializers, pagination, backends, permissions

     
class CarListCreateView(generics.ListCreateAPIView):
    permission_classes = [rest_permissions.ReadOnly|permissions.CarWritePermission]
    pagination_class = pagination.CarPagination
    ordering_fields = ['created_at', 'price', 'distance', 'made_at']
    filter_backends = [backends.CarSearchFilterBackend]

    def get_queryset(self):
        return models.Car.cars.select_related('car_model', 'car_model__brand', 'city', 'gear_lever', 'fuel', 'engine').prefetch_related('car_images')

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs['car'])
        self.check_object_permissions(self.request, obj)
        return obj

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.request.POST:
            return serializers.CarCreateUpdateSerializer
        return serializers.CarListSerializer


class UserCarListView(generics.ListAPIView):

    permission_classes = [rest_permissions.ReadOnly]
    pagination_class = pagination.CarPagination
    ordering_fields = ['created_at', 'price', 'distance', 'made_at']
    serializer_class = serializers.CarListSerializer

    def get_queryset(self):
        queryset = models.Car.cars.select_related('car_model', 'car_model__brand', 'city', 'gear_lever', 'fuel', 'engine').prefetch_related('car_images')
        if(self.request.user.id == self.kwargs['id']):
            q = self.request.query_params or None
            if q and q.get('is_pending'):
                return queryset.filter(is_active=False)
        return queryset
        

class CarGetUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [rest_permissions.ReadOnly|permissions.CarWritePermission]

    def get_queryset(self):
        if self.request.method == "GET":
            return models.Car.cars.select_related('car_model', 'car_model__brand', 'city', 'gear_lever', 'fuel', 'engine', 'car_body', 'color', 'fuel', 'transmission', 'user', 'car_images')
        return models.Car.cars

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs['car'])
        self.check_object_permissions(self.request, obj)
        return obj

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.request.POST:
            return serializers.CarCreateUpdateSerializer
        return serializers.CarListSerializer


class BrandListView(generics.ListAPIView):
    queryset = models.Brand.objects.all()
    serializer_class = serializers.BrandSerializer


class CarModelListView(generics.ListAPIView):
    serializer_class = serializers.CarModelSerializer

    def get_queryset(self):
        brand = models.Brand.objects.get(id=self.kwargs['brand'])
        return models.CarModel.objects.filter(brand=brand)
    

class CityListView(generics.ListAPIView):
    queryset = models.City.objects.all()
    serializer_class = serializers.CitySerializer


class CarBodyListView(generics.ListAPIView):
    queryset = models.CarBody.objects.all()
    serializer_class = serializers.CarBodySerializer

class ColorListView(generics.ListAPIView):
    queryset = models.Color.objects.all()
    serializer_class = serializers.ColorSerializer


class EngineListView(generics.ListAPIView):
    queryset = models.Engine.objects.all()
    serializer_class = serializers.EngineSerializer


class EquipmentListView(generics.ListAPIView):
    queryset = models.Equipment.objects.all()
    serializer_class = serializers.EquipmentSerializer


class GearLeverListView(generics.ListAPIView):
    queryset = models.GearLever.objects.all()
    serializer_class = serializers.GearLeverSerializer


class TransmissionListView(generics.ListAPIView):
    queryset = models.Transmission.objects.all()
    serializer_class = serializers.TransmissionSerializer


class FuelListView(generics.ListAPIView):
    queryset = models.Fuel.objects.all()
    serializer_class = serializers.FuelSerializer


