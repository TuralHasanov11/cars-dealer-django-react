from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auto/', include('cars.urls', namespace='cars')),
    path('api/auth/', include('account.urls', namespace='account')),
    path('api-auth/', include('rest_framework.urls')),
]
