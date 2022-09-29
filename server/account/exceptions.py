from rest_framework.exceptions import APIException

class UserNotFound(APIException):
  status_code = 404
  default_detail = 'User not found!'
  default_code = 'car_not_found'