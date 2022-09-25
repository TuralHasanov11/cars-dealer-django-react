from rest_framework_simplejwt import authentication as jwt_authentication
from django.conf import settings
from rest_framework import authentication, exceptions
import jwt
from rest_framework.authentication import BaseAuthentication
from django.middleware.csrf import CsrfViewMiddleware
from django.contrib.auth import get_user_model


def enforce_csrf(request):
    check = authentication.CSRFCheck(request)
    reason = check.process_view(request, None, (), {})
    if reason:
      raise exceptions.PermissionDenied('CSRF Failed: %s' % reason)


class CustomAuthentication(jwt_authentication.JWTAuthentication):
    def authenticate(self, request):
      header = self.get_header(request)
      if header is None:
          raw_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE']) or None
      else:
          raw_token = self.get_raw_token(header)
      if raw_token is None:
          return None

      validated_token = self.get_validated_token(raw_token)
      enforce_csrf(request)
      return self.get_user(validated_token), validated_token


