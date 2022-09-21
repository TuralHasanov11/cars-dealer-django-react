from django.urls import path
from account import views
from rest_framework_simplejwt import views as jwt_views

app_name='account'

urlpatterns = [
    path('register', views.register, name='register'), 
    path('logout/blacklist', views.blackListToken, name='blacklist'), 
    path('token', views.AccountTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('change-password', views.passwordChange, name='password_change'), 
    path('<int:id>', views.accountDetail, name='user_detail'),
    path('<int:id>/cars', views.UserCarListView.as_view(), name='user_cars'),  
]
