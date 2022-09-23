from rest_framework import generics, views as rest_views, permissions as rest_permissions, decorators as rest_decorators, response, status
from rest_framework_simplejwt import tokens, serializers as jwt_serializers, views as jwt_views
from account import models, serializers
from cars import models as carModels, serializers as carSerializers, pagination, permissions as carPermissions
from django.middleware import csrf
from django.contrib.auth import authenticate
from django.conf import settings


def get_tokens_for_user(user):
    refresh = tokens.RefreshToken.for_user(user)
    return {
        'refresh_token': str(refresh),
        'access_token': str(refresh.access_token),
    }

class LoginView(rest_views.APIView):
    def post(self, request, format=None):
        data = request.data
        response = response.Response()        
        username = data.get('username', None)
        password = data.get('password', None)
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                data = get_tokens_for_user(user)
                response.set_cookie(
                    key = settings.SIMPLE_JWT['AUTH_COOKIE'], 
                    value = data["access"],
                    expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                    secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                )
                csrf.get_token(request)
                response.data = {"Success" : "Login successfully","data":data}
                return response
            else:
                return response.Response({"No active" : "This account is not active!!"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return response.Response({"Invalid" : "Invalid username or password!!"}, status=status.HTTP_404_NOT_FOUND)

@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([])
def register(request):

    serializer = serializers.RegistrationSerializer(data=request.data)
    
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return response.Response(status=status.HTTP_201_CREATED)
        

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
        account = models.Account.objects.select_related('profile_user').prefetch_related('user_wishlist').get(id=request.user.id)
    except models.Account.DoesNotExist:
        return response.Response(status=status.HTTP_404_NOT_FOUND)

    serializer = serializers.AccountSerializer(account)
    
    return response.Response(serializer.data)


@rest_decorators.api_view(['GET'])
@rest_decorators.permission_classes([])
def accountDetail(request, id):
    try:
        account = models.Account.objects.select_related('profile_user').get(id=id)
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
    pagination_class = pagination.CarPagination
    ordering_fields = ['created_at', 'price', 'distance', 'made_at']
    serializer_class = carSerializers.CarListSerializer

    def get_queryset(self):
        queryset = carModels.Car.cars.select_related('car_model', 'car_model__brand', 'city', 'gear_lever', 'fuel', 'engine').prefetch_related('car_images')
        if(self.request.user.id == self.kwargs['id']):
            q = self.request.query_params or None
            if q and q.get('is_pending'):
                return queryset.filter(is_active=False)
        return queryset


class WishlistView(generics.ListAPIView):
    permission_classes = [carPermissions.CarReadOnlyPermission, rest_permissions.IsAuthenticated]
    pagination_class = pagination.CarPagination
    serializer_class = carSerializers.CarListSerializer
    ordering = ('-created_at')

    def get_queryset(self):
        queryset = carModels.Car.cars.select_related('car_model', 'car_model__brand', 'city', 'gear_lever', 'fuel', 'engine').prefetch_related('car_images').filter(wishlist__id=self.request.user.id)
        return queryset


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def wishlistAdd(request, id):
    try:
        car = carModels.Car.cars.get(id=id)
        request.user.wishlist.add(car)
        return response.Response({'car_id':car.id})
    except carModels.Car.DoesNotExist:
        return response.Response(status=status.HTTP_404_NOT_FOUND)
    except:
        return response.Response(status=status.HTTP_400_BAD_REQUEST)


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def wishlistRemove(request, id):
    try:
        car = carModels.Car.cars.get(id=id)
        request.user.wishlist.remove(car)
        return response.Response({'car_id':car.id})
    except carModels.Car.DoesNotExist:
        return response.Response(status=status.HTTP_404_NOT_FOUND)
    except:
        return response.Response(status=status.HTTP_400_BAD_REQUEST)


@rest_decorators.api_view(['POST'])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def wishlistClear(request):
    try:
        request.user.wishlist.clear()
        return response.Response({'message':'wishlist cleared'})
    except:
        return response.Response(status=status.HTTP_400_BAD_REQUEST)