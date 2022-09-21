from rest_framework import permissions as rest_permissions, decorators as rest_decorators, response, status
from rest_framework_simplejwt import tokens, serializers as jwt_serializers, views as jwt_views
from account import models, serializers

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
@rest_decorators.permission_classes([])
def accountDetail(request, id):
    try:
        account = models.Account.objects.select_related('profile_user').get(id=id)
    except models.Account.DoesNotExist:
        return response.Response(status=status.HTTP_404_NOT_FOUND)

    if request.user.is_authenticated and request.user.id == int(id):
        serializer = serializers.AccountSerializer(account)
    else:
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
