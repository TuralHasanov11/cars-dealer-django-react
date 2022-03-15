from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from account import views as accountViews 

app_name='api'

urlpatterns = [
    path('cars', views.CarListCreateView.as_view(), name='cars'),
    path('cars/<int:id>', views.carRetreiveUpdateDelete, name='carRetreiveUpdateDelete'),
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

    path('user/register', accountViews.register, name='register'), 
    path('user/logout/blacklist', accountViews.blackListToken, name='blacklist'), 
    path('user/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/<int:id>', accountViews.accountDetail, name='user_detail'),
    path('user/<int:id>/cars', views.UserCarListView.as_view(), name='user_cars'),  
]
