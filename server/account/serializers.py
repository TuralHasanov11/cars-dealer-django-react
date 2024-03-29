from dataclasses import field
from rest_framework import serializers
from django.conf import settings
from account import models

class RegistrationSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    phone = serializers.CharField(max_length=50)
    
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ['email', 'username', 'password', 'password2', 'phone']
        extra_kwargs = {
            'password':{'write_only':True}
        }

    def save(self):
        user = settings.AUTH_USER_MODEL(
            email= self.validated_data['email'],
            username = self.validated_data['username'],
        )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password':'Password must match!'})

        user.set_password(password)
        user.save()

        models.Profile.objects.create(user=user, phone=self.validated_data['phone'])

        return user

class PasswordChangeSerializer(serializers.ModelSerializer):
    new_password1 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    new_password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    old_password = serializers.CharField(style={'input_type':'password'}, write_only=True)

    class Meta:
        model=settings.AUTH_USER_MODEL
        fields = ['old_password', 'new_password1', 'new_password2']

    def validate(self, data):
        old_password = data['old_password']
        new_password1 = data['new_password1']
        new_password2 = data['new_password2']

        if not self.instance.check_password(old_password):
            raise serializers.ValidationError("Old password is incorrect!")

        if not new_password1 == new_password2:    
            raise serializers.ValidationError("New Password and Password confirmation do not match!")

        return data

    def save(self, **kwargs):
        try:
            self.instance.set_password(self.validated_data['new_password1'])
            return self.instance.save()
        except:
            raise serializers.ValidationError("Failed to change password!")

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model=models.Profile
        fields = ['phone']

class AccountSerializer(serializers.ModelSerializer):

    profile_user = ProfileSerializer(many=False)

    class Meta:
        model=settings.AUTH_USER_MODEL
        fields = ['id', 'username', 'email', 'profile_user']

class AccountSecondarySerializer(serializers.ModelSerializer):

    profile_user = ProfileSerializer(many=False)

    class Meta:
        model=settings.AUTH_USER_MODEL
        fields = ['id', 'username', 'profile_user']