from django.urls import path, re_path
from account import views
from rest_framework_simplejwt import views as jwt_views

app_name='account'

urlpatterns = [
    path('register', views.register, name='register'), 
    path('logout', views.logout, name='logout'), 
    path('login', views.loginView, name="login"),
    path('token/refresh', views.CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('change-password', views.passwordChange, name='password_change'), 
    path('user', views.user, name='user'),
    path('<int:id>', views.accountDetail, name='user_detail'),
    path('<int:id>/cars', views.UserCarListView.as_view(), name='user_cars'), 
    path('wishlist', views.WishlistView.as_view(), name='wishlist'), 
    path('wishlist/<int:id>/add', views.wishlistAdd, name='wishlist_add'), 
    path('wishlist/<int:id>/remove', views.wishlistRemove, name='wishlist_remove'), 
    path('wishlist/clear', views.wishlistClear, name='wishlist_clear'),
    path('activate/<uidb64>/<token>',  views.activate, name='activate'),  
]
