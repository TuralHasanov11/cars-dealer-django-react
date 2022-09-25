from rest_framework import generics, views as rest_views, permissions as rest_permissions, decorators as rest_decorators, response, status
from rest_framework_simplejwt import tokens, serializers as jwt_serializers, views as jwt_views, exceptions
from account import models, serializers
from cars import models as carModels, serializers as carSerializers, pagination, permissions as carPermissions
from django.middleware import csrf
from django.contrib.auth import authenticate
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie

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
            raise exceptions.InvalidToken('No valid token found in cookie \'refresh\'')

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
    data = request.data
    res = response.Response()        
    email = data.get('email', None)
    password = data.get('password', None)
    user = authenticate(email=email, password=password)
    if user is not None:
        if user.is_active:
            data = get_tokens_for_user(user)
            res.set_cookie(
                key = settings.SIMPLE_JWT['AUTH_COOKIE'], 
                value = data["access_token"],
                expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite = "None"
            )

            res.set_cookie(
                key = settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'], 
                value = data["refresh_token"],
                expires = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite = "None"
            )
            res.data = data
            res["X-CSRFToken"] = csrf.get_token(request)
            return res
        else:
            return response.Response({"No active" : "This account is not active!!"}, status=status.HTTP_404_NOT_FOUND)
    else:
        return response.Response({"Invalid" : "Invalid email or password!!"}, status=status.HTTP_404_NOT_FOUND)
       

@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([])
def register(request):

    serializer = serializers.RegistrationSerializer(data=request.data)
    
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    res = response.Response()
    user = authenticate(email=user.email, password=user.password)
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
            return response.Response({"No active" : "This account is not active!!"}, status=status.HTTP_404_NOT_FOUND)
    else:
        return response.Response({"Invalid" : "Invalid email or password!!"}, status=status.HTTP_404_NOT_FOUND)
            

@rest_decorators.api_view(['POST'])
@rest_decorators.authentication_classes([])
@rest_decorators.permission_classes([])
def blackListToken(request):
    try:
        refreshToken = request.data['refresh_token']
        token = tokens.RefreshToken(refreshToken)
        token.blacklist()
    except:
        return response.Response(status=status.HTTP_400_BAD_REQUEST)

    return response.Response({'message':'refresh token blacklisted'})


@rest_decorators.api_view(['GET'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def user(request):
    try:
        account = models.Account.objects.select_related('account_profile').get(id=request.user.id)
    except models.Account.DoesNotExist:
        return response.Response(status=status.HTTP_404_NOT_FOUND)

    serializer = serializers.AccountSerializer(account)
    
    return response.Response(serializer.data)


@rest_decorators.api_view(['GET'])
@rest_decorators.permission_classes([])
def accountDetail(request, id):
    try:
        account = models.Account.objects.select_related('account_profile').get(id=id)
    except models.Account.DoesNotExist:
        return response.Response(status=status.HTTP_404_NOT_FOUND)

    serializer = serializers.AccountSecondarySerializer(account)
    
    return response.Response(serializer.data)


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def passwordChange(request):

    serializer = serializers.PasswordChangeSerializer(request.user, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    
    return response.Response({'message':'Password is changed'})


class AccountTokenObtainPairSerializer(jwt_serializers.TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class AccountTokenObtainPairView(jwt_views.TokenObtainPairView):
    serializer_class = AccountTokenObtainPairSerializer

class UserCarListView(generics.ListAPIView):
    permission_classes = [carPermissions.CarReadOnlyPermission]
    ordering_fields = ['created_at', 'price', 'distance', 'made_at']
    serializer_class = carSerializers.CarListSerializer

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
        return response.Response(status=status.HTTP_404_NOT_FOUND)
    except Exception as err:
        return response.Response(status=status.HTTP_400_BAD_REQUEST)


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def wishlistRemove(request, id):
    try:
        car = carModels.Car.cars.get(id=id)
        request.user.user_wishlist.remove(car)
        return response.Response({'car_id':car.id})
    except carModels.Car.DoesNotExist:
        return response.Response(status=status.HTTP_404_NOT_FOUND)
    except:
        return response.Response(status=status.HTTP_400_BAD_REQUEST)


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def wishlistClear(request):
    try:
        request.user.user_wishlist.clear()
        return response.Response({'message':'wishlist cleared'})
    except:
        return response.Response(status=status.HTTP_400_BAD_REQUEST)