from django.http import request
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import  BasePermission,IsAuthenticated,IsAuthenticatedOrReadOnly, SAFE_METHODS, AllowAny
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView, ListCreateAPIView  
from rest_framework import filters

from account.views import CarWritePermission, ReadOnly

from .models import (Brand, Car, CarModel, City, Color, Transmission, Engine,
    GearLever, Fuel, Equipment, CarBody)
from .serializers import (BrandSerializer, CarModelSerializer, CitySerializer,
    ColorSerializer,CarBodySerializer, TransmissionSerializer, EngineSerializer,
    EquipmentSerializer, FuelSerializer, GearLeverSerializer,
    CarCreateUpdateSerializer, CarListSerializer, CarDetailSerializer)
from .pagination import CarPagination

     
class CarSearchFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        q = request.query_params or None
        if q:
            if q.get('currency'):
                queryset=queryset.filter(currency=q['currency'])
            if q.get('barter') == 'true':
                queryset=queryset.filter(barter=True)
            if q.get('credit') == 'true':
                queryset=queryset.filter(credit=True)
            if q.get('city'):
                queryset=queryset.filter(city__in=q['city'])
            if q.get('min_engine'):
                queryset=queryset.filter(engine__volume__gte=q['min_engine'])
            if q.get('max_engine'):
                queryset=queryset.filter(engine__volume__lte=q['max_engine'])
            if q.get('min_made_at'):
                queryset=queryset.filter(made_at__gte=q['min_made_at'])
            if q.get('max_made_at'):
                queryset=queryset.filter(made_at__lte=q['max_made_at'])
            if q.get('car_model'):
                queryset=queryset.filter(car_model__in=q['car_model'])
            if q.get('brand'):
                queryset=queryset.filter(car_model__brand__in=q['brand'])
            if q.get('min_distance'):
                queryset=queryset.filter(distance__gte=q['min_distance'])
            if q.get('max_distance'):
                queryset=queryset.filter(distance__lte=q['max_distance'])
            if q.get('is_new'):
                queryset=queryset.filter(distance=0)
            if q.get('min_price'):
                queryset=queryset.filter(price__gte=q['min_price'])
            if q.get('max_price'):
                queryset=queryset.filter(price__lte=q['max_price'])
            if q.get('is_used') == 'true':
                queryset=queryset.filter(distance__gt=0)   
            if q.get('equipment[]'):
                queryset = queryset.filter(equipment__in=list(map(int, request.query_params.getlist('equipment[]')))) 
            if q.get('color[]'):
                queryset=queryset.filter(color__in=list(map(int, request.query_params.getlist('color[]')))) 
            if q.get('fuel[]'):
                queryset=queryset.filter(fuel__in=list(map(int, request.query_params.getlist('fuel[]'))))
            if q.get('gear_lever[]'):
                queryset=queryset.filter(gear_lever__in=list(map(int, request.query_params.getlist('gear_lever[]'))))
            if q.get('transmission[]'):
                queryset=queryset.filter(transmission__in=list(map(int, request.query_params.getlist('transmission[]'))))
            if q.get('car_body[]'):
                queryset=queryset.filter(car_body__in=list(map(int, request.query_params.getlist('car_body[]'))))                           
        return queryset


class CarListCreateView(ListCreateAPIView):
    permission_classes = [ReadOnly|CarWritePermission]
    pagination_class = CarPagination
    ordering_fields = ['created_at', 'price', 'distance', 'made_at']
    ordering = ['-created_at']
    filter_backends = [filters.OrderingFilter, CarSearchFilterBackend]

    def get_queryset(self):
        return Car.objects.select_related('car_model').select_related('car_model__brand').select_related('city').select_related('gear_lever').select_related('fuel').select_related('engine').filter(is_active=True)

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs['car'])
        self.check_object_permissions(self.request, obj)
        return obj

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.request.POST:
            return CarCreateUpdateSerializer
        return CarListSerializer
   

class UserCarListView(ListAPIView):

    permission_classes = [ReadOnly]
    pagination_class = CarPagination
    ordering_fields = ['created_at', 'price', 'distance', 'made_at']
    ordering = ['-created_at']
    filter_backends = [filters.OrderingFilter]

    def get_queryset(self):

        queryset = Car.objects.select_related('car_model').select_related('car_model__brand').select_related('city').select_related('gear_lever').select_related('fuel').select_related('engine').select_related('user').filter(user=self.kwargs['id'])
        if(self.request.user.id == self.kwargs['id']):
            q = self.request.query_params or None
            if q:
                if q.get('is_pending'):
                    queryset=queryset.filter(is_active=False)
                return queryset
        return queryset.filter(is_active=True)

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), id=self.kwargs['car'])
        self.check_object_permissions(self.request, obj)
        return obj

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_serializer_class(self):
        return CarListSerializer

    


# @permission_classes([])
# @api_view(['GET','POST'])
# def carListCreate(request):
#     if request.POST:
#         serializer = CarCreateUpdateSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#     else:
#         cars = Car.objects.select_related('car_model').select_related('car_model__brand').select_related('city').select_related('engine').filter(is_active=True)
#         serializer = CarListSerializer(cars, many=True)

#     return Response(serializer.data)


@permission_classes([ReadOnly|CarWritePermission])
@api_view(['GET','PUT','DELETE'])
def carRetreiveUpdateDelete(request, id):

    try:
        car = Car.objects.select_related('car_model').select_related('car_model__brand').select_related('city').select_related('engine').select_related('car_body').select_related('color').select_related('fuel').select_related('gear_lever').select_related('transmission').select_related('user').get(id=id, is_active=True)
    except Car.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CarDetailSerializer(car)
    elif request.method == 'PUT':
        serializer = CarCreateUpdateSerializer(car, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
    elif request.method == 'DELETE':
        car.delete()
        return Response({'message':'Car deleted'})

    return Response(serializer.data)



class BrandListView(ListAPIView):

    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class CarModelListView(ListAPIView):

    serializer_class = CarModelSerializer

    def get_queryset(self):
        brand = Brand.objects.get(id=self.kwargs['brand'])
        return CarModel.objects.filter(brand=brand)
    

class CityListView(ListAPIView):

    queryset = City.objects.all()
    serializer_class = CitySerializer

class CarBodyListView(ListAPIView):

    queryset = CarBody.objects.all()
    serializer_class = CarBodySerializer

class ColorListView(ListAPIView):

    queryset = Color.objects.all()
    serializer_class = ColorSerializer

class EngineListView(ListAPIView):

    queryset = Engine.objects.all()
    serializer_class = EngineSerializer

class EquipmentListView(ListAPIView):

    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer

class GearLeverListView(ListAPIView):

    queryset = GearLever.objects.all()
    serializer_class = GearLeverSerializer

class TransmissionListView(ListAPIView):

    queryset = Transmission.objects.all()
    serializer_class = TransmissionSerializer

class FuelListView(ListAPIView):

    queryset = Fuel.objects.all()
    serializer_class = FuelSerializer
