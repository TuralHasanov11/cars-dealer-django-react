from django.urls import path
from cars import views
from rest_framework_simplejwt import views as jwt_views

app_name='cars'

urlpatterns = [
    path('cars', views.CarListCreateView.as_view(), name='cars'),
    path('cars/check', views.checkCar, name='cars_check'),
    path('cars/<int:car>', views.CarGetUpdateDeleteView.as_view(), name='carRetreiveUpdateDelete'),
    path('brands', views.BrandListView.as_view(), name='brands'),
    path('brands/<int:brand>/models', views.CarModelListView.as_view(), name='models'),
    path('colors', views.ColorListView.as_view(), name='colors'),
    path('cities', views.CityListView.as_view(), name='cities'),
    path('car-bodies', views.CarBodyListView.as_view(), name='car-bodies'),
    path('engines', views.EngineListView.as_view(), name='engines'),
    path('equipment', views.EquipmentListView.as_view(), name='equipment'),
    path('gear-levers', views.GearLeverListView.as_view(), name='gear-lever'),
    path('transmissions', views.TransmissionListView.as_view(), name='transmissions'),
    path('fuels', views.FuelListView.as_view(), name='fuels'),
]
