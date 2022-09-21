from rest_framework import filters

class CarSearchFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        q = request.query_params or None
        if q:
            if q.get('currency'):
                queryset=queryset.filter(currency=q['currency'])
            if q.get('barter') == 'true':
                queryset=queryset.filter(barter=True)
            if q.get('credit') == 'true':
                queryset=queryset.filter(credit=True)
            if q.get('city'):
                queryset=queryset.filter(city__in=q['city'])
            if q.get('min_engine'):
                queryset=queryset.filter(engine__volume__gte=q['min_engine'])
            if q.get('max_engine'):
                queryset=queryset.filter(engine__volume__lte=q['max_engine'])
            if q.get('min_made_at'):
                queryset=queryset.filter(made_at__gte=q['min_made_at'])
            if q.get('max_made_at'):
                queryset=queryset.filter(made_at__lte=q['max_made_at'])
            if q.get('car_model'):
                queryset=queryset.filter(car_model__in=q['car_model'])
            if q.get('brand'):
                queryset=queryset.filter(car_model__brand__in=q['brand'])
            if q.get('min_distance'):
                queryset=queryset.filter(distance__gte=q['min_distance'])
            if q.get('max_distance'):
                queryset=queryset.filter(distance__lte=q['max_distance'])
            if q.get('is_new'):
                queryset=queryset.filter(distance=0)
            if q.get('min_price'):
                queryset=queryset.filter(price__gte=q['min_price'])
            if q.get('max_price'):
                queryset=queryset.filter(price__lte=q['max_price'])
            if q.get('is_used') == 'true':
                queryset=queryset.filter(distance__gt=0)   
            if q.get('equipment[]'):
                queryset = queryset.filter(equipment__in=list(map(int, request.query_params.getlist('equipment[]')))) 
            if q.get('color[]'):
                queryset=queryset.filter(color__in=list(map(int, request.query_params.getlist('color[]')))) 
            if q.get('fuel[]'):
                queryset=queryset.filter(fuel__in=list(map(int, request.query_params.getlist('fuel[]'))))
            if q.get('gear_lever[]'):
                queryset=queryset.filter(gear_lever__in=list(map(int, request.query_params.getlist('gear_lever[]'))))
            if q.get('transmission[]'):
                queryset=queryset.filter(transmission__in=list(map(int, request.query_params.getlist('transmission[]'))))
            if q.get('car_body[]'):
                queryset=queryset.filter(car_body__in=list(map(int, request.query_params.getlist('car_body[]'))))                           
        return queryset

