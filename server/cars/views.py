from django.shortcuts import get_object_or_404
from rest_framework import generics, exceptions as apiExceptions
from cars import models, serializers, pagination, backends, permissions
from payment import payment_integrator
from rest_framework import generics, permissions as rest_permissions, decorators as rest_decorators, response, status
     
class CarListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.CarReadOnlyPermission|permissions.CarWritePermission]
    pagination_class = pagination.CarPagination
    ordering_fields = ['created_at', 'price', 'distance', 'made_at']
    filter_backends = [backends.CarSearchFilterBackend]
    ordering = ['-created_at']

    def get_queryset(self):
        return models.Car.cars.select_related('car_model', 'car_model__brand', 'city', 'gear_lever', 'fuel', 'engine', 'user').prefetch_related('car_images')

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs['car'])
        self.check_object_permissions(self.request, obj)
        return obj

    def post(self, request, *args, **kwargs):
        try:
            payment = payment_integrator.CardPayment.pay(
                paymentMethod=request.data["payment_method_id"], 
                paymentId=request.data["payment_id"]
            )
        except Exception as err:
            return response.Response(str(err), status=status.HTTP_400_BAD_REQUEST) 
        return self.create(request, *args, **kwargs)
        

    def get_serializer_class(self):
        if self.request.POST:
            return serializers.CarCreateUpdateSerializer
        return serializers.CarListSerializer
        

@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def checkCar(request):
    serializer = serializers.CarCreateUpdateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return response.Response({'message':'Car data is correct!'})


class CarGetUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.CarReadOnlyPermission|permissions.CarWritePermission]

    def get_queryset(self):
        if self.request.method == "GET":
            return models.Car.cars.select_related('car_model', 'car_model__brand', 'city', 'gear_lever', 'fuel', 'engine', 'car_body', 'color', 'fuel', 'transmission', 'user__account_profile').prefetch_related('car_images')
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
        return serializers.CarDetailSerializer


class BrandListView(generics.ListAPIView):
    queryset = models.Brand.objects.order_by("name")
    serializer_class = serializers.BrandSerializer


class CarModelListView(generics.ListAPIView):
    serializer_class = serializers.CarModelSerializer

    def get_queryset(self):
        brand = models.Brand.objects.get(id=self.kwargs['brand'])
        return models.CarModel.objects.filter(brand=brand).order_by("name")
    

class CityListView(generics.ListAPIView):
    queryset = models.City.objects.order_by("name")
    serializer_class = serializers.CitySerializer


class CarBodyListView(generics.ListAPIView):
    queryset = models.CarBody.objects.order_by("name")
    serializer_class = serializers.CarBodySerializer

class ColorListView(generics.ListAPIView):
    queryset = models.Color.objects.order_by("name")
    serializer_class = serializers.ColorSerializer


class EngineListView(generics.ListAPIView):
    queryset = models.Engine.objects.order_by("volume")
    serializer_class = serializers.EngineSerializer


class EquipmentListView(generics.ListAPIView):
    queryset = models.Equipment.objects.order_by("name")
    serializer_class = serializers.EquipmentSerializer


class GearLeverListView(generics.ListAPIView):
    queryset = models.GearLever.objects.order_by("name")
    serializer_class = serializers.GearLeverSerializer


class TransmissionListView(generics.ListAPIView):
    queryset = models.Transmission.objects.order_by("name")
    serializer_class = serializers.TransmissionSerializer


class FuelListView(generics.ListAPIView):
    queryset = models.Fuel.objects.order_by("name")
    serializer_class = serializers.FuelSerializer


