from rest_framework import permissions

class CarWritePermission(permissions.BasePermission):

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