from rest_framework import filters
from cars import models, exceptions as carExceptions


class CarSearchFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        self.query = request.query_params or None
        if self.query:
            queryset = (self.
                filter_currency().
                filter_barter().
                filter_credit().
                filter_city().
                filter_min_engine().
                filter_max_engine().
                filter_min_made_at().
                filter_max_made_at().
                filter_car_model().
                filter_brand().
                filter_min_distance().
                filter_max_distance().
                filter_equipment(request=request).
                filter_color(request=request).
                filter_fuel(request=request).
                filter_transmission(request=request).
                filter_gear_lever(request=request).
                filter_car_body(request=request)).queryResult
        return queryset

    def filter_currency(self):
        if self.query.get('currency'):
            self.queryResult=self.queryResult.filter(currency=self.query.get('currency'))
        return self
    
    def filter_barter(self):
        if self.query.get('barter') == 'true':
            self.queryResult=self.queryResult.filter(barter=True)
        return self

    def filter_credit(self):
        if self.query.get('credit'):
            self.queryResult=self.queryResult.filter(credit=True)
        return self

    def filter_city(self):
        if self.query.get('city'):
            self.queryResult=self.queryResult.filter(city__in=self.query.get('city'))
        return self

    def filter_min_engine(self):
        if self.query.get('min_engine'):
            self.queryResult=self.queryResult.filter(engine__volume__gte=self.query.get('min_engine'))
        return self

    def filter_max_engine(self):
        if self.query.get('max_engine'):
            self.queryResult=self.queryResult.filter(engine__volume__lte=self.query.get('max_engine'))
        return self

    def filter_min_made_at(self):
        if self.query.get('min_made_at'):
            self.queryResult=self.queryResult.filter(made_at__gte=self.query.get('min_made_at'))
        return self

    def filter_max_made_at(self):
        if self.query.get('max_made_at'):
            self.queryResult=self.queryResult.filter(made_at__lte=self.query.get('max_made_at'))
        return self

    def filter_car_model(self):
        if self.query.get('car_model'):
            self.queryResult=self.queryResult.filter(car_model__in=self.query.get('car_model'))
        return self

    def filter_brand(self):
        if self.query.get('brand'):
            self.queryResult=self.queryResult.filter(car_model__brand__in=self.query.get('brand'))
        return self

    def filter_min_distance(self):
        if self.query.get('min_distance'):
            self.queryResult=self.queryResult.filter(distance__gte=self.query.get('min_distance'))
        return self

    def filter_max_distance(self):
        if self.query.get('max_distance'):
            self.queryResult=self.queryResult.filter(distance__lte=self.query.get('max_distance'))
        return self

    def filter_is_new(self):
        if self.query.get('is_new') == 'true':
            self.queryResult=self.queryResult.filter(distance=0)
        return self

    def filter_equipment(self, request):
        if self.query.get('equipment[]'):
            self.queryResult=self.queryResult.filter(equipment__in=list(map(int, request.query_params.getlist('equipment[]'))))
        return self

    def filter_color(self, request):
        if self.query.get('color[]'):
            self.queryResult=self.queryResult.filter(color__in=list(map(int, request.query_params.getlist('color[]')))) 
        return self

    def filter_fuel(self, request):
        if self.query.get('fuel[]'):
            self.queryResult=self.queryResult.filter(fuel__in=list(map(int, request.query_params.getlist('fuel[]'))))
        return self

    def filter_transmission(self, request):
        if self.query.get('transmission[]'):
            self.queryResult=self.queryResult.filter(transmission__in=list(map(int, request.query_params.getlist('transmission[]'))))
        return self

    def filter_gear_lever(self, request):
        if self.query.get('gear_lever[]'):
            self.queryResult=self.queryResult.filter(gear_lever__in=list(map(int, request.query_params.getlist('gear_lever[]'))))
        return self
    
    def filter_car_body(self, request):
        if self.query.get('car_body[]'):
            self.queryResult=self.queryResult.filter(car_body__in=list(map(int, request.query_params.getlist('car_body[]'))))   
        return self


def uploadCarImages(instance, images, created=False):
    if created:
        try:
            models.CarImage.objects.create(car=instance, image=images["front_image"], type=models.CarImage.ImageTypes.FRONT)
            models.CarImage.objects.create(car=instance, image=images["back_image"], type=models.CarImage.ImageTypes.BACK)
            models.CarImage.objects.create(car=instance, image=images["panel_image"], type=models.CarImage.ImageTypes.PANEL)
        
            if "other_images" in images:
                for image_data in images["other_images"]:
                    models.CarImage.objects.create(car=instance, image=image_data, type=models.CarImage.ImageTypes.OTHER)

            return True
        except Exception:
            raise carExceptions.CarImageNotUploaded
    else:
        try:
            if 'front_image' in images:
                models.CarImage.objects.filter(car=instance, type=models.CarImage.ImageTypes.FRONT).delete()
                models.CarImage.objects.create(car=instance, image=images['front_image'], type=models.CarImage.ImageTypes.FRONT)
            if 'back_image' in images:
                models.CarImage.objects.filter(car=instance, type=models.CarImage.ImageTypes.BACK).delete()
                models.CarImage.objects.create(car=instance, image=images['back_image'], type=models.CarImage.ImageTypes.BACK)
            if 'panel_image' in images:
                models.CarImage.objects.filter(car=instance, type=models.CarImage.ImageTypes.PANEL).delete()
                models.CarImage.objects.create(car=instance, image=images['panel_image'], type=models.CarImage.ImageTypes.PANEL)
            if 'other_images' in images:
                models.CarImage.objects.filter(car=instance, type=models.CarImage.ImageTypes.OTHER).delete()
                for image_data in images['other_images']:
                        models.CarImage.objects.create(car=instance, image=image_data, type=models.CarImage.ImageTypes.OTHER)
            
            return True
        except Exception:
            raise carExceptions.CarImageNotUploaded