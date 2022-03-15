from django.http import request
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import  BasePermission,IsAuthenticated,IsAuthenticatedOrReadOnly, SAFE_METHODS, AllowAny
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView, ListCreateAPIView  
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Account
from .serializers import AccountSecondarySerializer, AccountSerializer, RegistrationSerializer


@api_view(['POST'])
@permission_classes([])
def register(request):

    serializer = RegistrationSerializer(data=request.data)
    
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        return Response(status=status.HTTP_201_CREATED)
        

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def blackListToken(request):
    try:
        refreshToken = request.data['refresh_token']
        token = RefreshToken(refreshToken)
        token.blacklist()
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    return Response({'message':'refresh token blacklisted'})

    
class CarWritePermission(BasePermission):

    def has_permission(self, request, view):
        self.message = 'You are not allowed to modify the account'
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        self.message = 'You are not allowed to modify the account'
        if obj.user == request.user:
            return True
        else:
            return False


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

    def has_object_permission(self, request, view, obj):
        return request.method in SAFE_METHODS


@api_view(['GET'])
@permission_classes([])
def accountDetail(request, id):
    try:
        account = Account.objects.select_related('profile_user').get(id=id)
    except Account.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.user.is_authenticated and request.user.id == int(id):
        serializer = AccountSerializer(account)
    else:
        serializer = AccountSecondarySerializer(account)
    
    return Response(serializer.data)
    


class AccountTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.name
        # ...

        return token

class AccountTokenObtainPairView(TokenObtainPairView):
    serializer_class = AccountTokenObtainPairSerializer