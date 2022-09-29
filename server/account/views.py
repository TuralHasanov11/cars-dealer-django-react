from rest_framework import generics, permissions as rest_permissions, decorators as rest_decorators, response, exceptions as apiExceptions
from rest_framework_simplejwt import tokens, serializers as jwt_serializers, views as jwt_views, exceptions as jwt_exceptions
from account import models, serializers
from cars import models as carModels, serializers as carSerializers,  permissions as carPermissions
from django.middleware import csrf
from django.contrib import auth
from django.conf import settings
from account import exceptions as accountExceptions
from cars import exceptions as carExceptions

def get_tokens_for_user(user):
    refresh = tokens.RefreshToken.for_user(user)
    return {
        'refresh_token': str(refresh),
        'access_token': str(refresh.access_token),
    }

class CookieTokenRefreshSerializer(jwt_serializers.TokenRefreshSerializer):
    refresh = None
    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise jwt_exceptions.InvalidToken('No valid token found in cookie \'refresh\'')

class CookieTokenRefreshView(jwt_views.TokenRefreshView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('refresh'):
            response.set_cookie( 
                key = settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'], 
                value = response.data['refresh'],
                expires = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )
            del response.data['refresh']
        response["X-CSRFToken"] = request.COOKIES.get('csrftoken')
        return super().finalize_response(request, response, *args, **kwargs)
    serializer_class = CookieTokenRefreshSerializer


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([])
def loginView(request):
    serializer = serializers.LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data["email"]
    password = serializer.validated_data["password"]

    res = response.Response()        

    user = auth.authenticate(email=email, password=password)
    if user is not None:
        if user.is_active:
            data = get_tokens_for_user(user)
            res.set_cookie(
                key = settings.SIMPLE_JWT['AUTH_COOKIE'], 
                value = data["access_token"],
                expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )

            res.set_cookie(
                key = settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'], 
                value = data["refresh_token"],
                expires = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )
            res.data = data
            res["X-CSRFToken"] = csrf.get_token(request)
            return res
        else:
            raise apiExceptions.PermissionDenied("Account is not activated!")
    else:
        raise apiExceptions.AuthenticationFailed("Email or Password is incorrect!")
       

@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([])
def register(request):

    serializer = serializers.RegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = serializer.save()
    res = response.Response()
    if user is not None:
        if user.is_active:
            data = get_tokens_for_user(user)
            res.set_cookie(
                key = settings.SIMPLE_JWT['AUTH_COOKIE'], 
                value = data["access_token"],
                expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )
            res["X-CSRFToken"] = csrf.get_token(request)
            res.data = data
            return res
        else:
            raise apiExceptions.PermissionDenied("Account is not activated!")
    else:
        raise apiExceptions.AuthenticationFailed("Invalid credentials!")
            

@rest_decorators.api_view(['POST'])
@rest_decorators.authentication_classes([])
@rest_decorators.permission_classes([])
def blackListToken(request):
    try:
        refreshToken = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        token = tokens.RefreshToken(refreshToken)
        token.blacklist()
        res = response.Response()
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        res.delete_cookie("X-CSRFToken")
        return res
    except:
        raise apiExceptions.ParseError(detail="Invalid token")


@rest_decorators.api_view(['GET'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def user(request):
    try:
        account = models.Account.objects.select_related('account_profile').get(id=request.user.id)
    except models.Account.DoesNotExist:
        return accountExceptions.UserNotFound

    serializer = serializers.AccountSerializer(account)
    return response.Response(serializer.data)


@rest_decorators.api_view(['GET'])
@rest_decorators.permission_classes([])
def accountDetail(request, id):
    try:
        account = models.Account.objects.select_related('account_profile').get(id=id)
    except models.Account.DoesNotExist:
        return accountExceptions.UserNotFound

    serializer = serializers.AccountSerializer(account)
    return response.Response(serializer.data)


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def passwordChange(request):
    serializer = serializers.PasswordChangeSerializer(request.user, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return response.Response({'message':'Password is changed!'})


class UserCarListView(generics.ListAPIView):
    permission_classes = [carPermissions.CarReadOnlyPermission]
    ordering_fields = ['created_at', 'price', 'distance', 'made_at']
    serializer_class = carSerializers.CarListSerializer
    ordering=["-created_at"]

    def get_queryset(self):
        queryset = carModels.Car.cars.select_related('car_model', 'car_model__brand', 'city', 'gear_lever', 'fuel', 'engine', 'user').prefetch_related('car_images')
        if(self.request.user.id == self.kwargs['id']):
            q = self.request.query_params or None
            if q and q.get('is_pending'):
                return queryset.filter(is_active=False)
        return queryset


class WishlistView(generics.ListAPIView):
    permission_classes = [carPermissions.CarReadOnlyPermission, rest_permissions.IsAuthenticated]
    serializer_class = carSerializers.CarListSerializer
    ordering = ('-created_at')

    def get_queryset(self):
        queryset = carModels.Car.cars.select_related('car_model', 'car_model__brand', 'city', 'gear_lever', 'fuel', 'engine', 'user').prefetch_related('car_images').filter(wishlist__id=self.request.user.id)
        return queryset


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def wishlistAdd(request, id):
    try:
        car = carModels.Car.cars.get(id=id)
        request.user.user_wishlist.add(car)
        return response.Response({'car_id':car.id})
    except carModels.Car.DoesNotExist:
        raise carExceptions.CarNotFound
    except:
        return apiExceptions.ParseError("Car cannot be added to wishlist!")


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def wishlistRemove(request, id):
    try:
        car = carModels.Car.cars.get(id=id)
        request.user.user_wishlist.remove(car)
        return response.Response({'car_id':car.id})
    except carModels.Car.DoesNotExist:
        raise carExceptions.CarNotFound
    except:
        return apiExceptions.ParseError("Car cannot be removed from wishlist!")


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def wishlistClear(request):
    try:
        request.user.user_wishlist.clear()
        return response.Response({'message':'Wishlist cleared!'})
    except:
        return apiExceptions.ParseError("Wishlist cannot be cleared!")