from rest_framework.exceptions import APIException

class CarNotFound(APIException):
  status_code = 404
  default_detail = 'Car not found!'
  default_code = 'car_not_found'

class CarImageNotUploaded(APIException):
  status_code = 400
  default_detail = 'Car image not uploaded!'
  default_code = 'car_image_not_uploaded'