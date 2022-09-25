from django.urls import path
from account import views
from rest_framework_simplejwt import views as jwt_views

app_name='account'

urlpatterns = [
    path('register', views.register, name='register'), 
    path('logout/blacklist', views.blackListToken, name='blacklist'), 
    path('login', views.loginView, name="login"),
    path('token', views.AccountTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', views.CookieTokenRefreshView.as_view(), name='token_refresh'),
    # path('token/refresh', views.refresh_token_view, name='token_refresh'),
    path('change-password', views.passwordChange, name='password_change'), 
    path('user', views.user, name='user'),
    path('<int:id>', views.accountDetail, name='user_detail'),
    path('<int:id>/cars', views.UserCarListView.as_view(), name='user_cars'), 
    path('wishlist', views.WishlistView.as_view(), name='wishlist'), 
    path('wishlist/<int:id>/add', views.wishlistAdd, name='wishlist_add'), 
    path('wishlist/<int:id>/remove', views.wishlistRemove, name='wishlist_remove'), 
    path('wishlist/clear', views.wishlistClear, name='wishlist_clear'),
]
