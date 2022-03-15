from django.contrib import admin
from .models import Account, Profile
from django.contrib.auth.admin import UserAdmin


class AccountAdmin(UserAdmin):
    model = Account
    search_fields = ('email', 'username')
    list_filter = ('email', 'username','is_active', 'is_staff')
    ordering = ()
    list_display = ('id','email', 'username',
                    'is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'username',)}),
        ('Permissions', {'fields': ('is_staff','is_admin', 'is_active')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_active', 'is_admin','is_staff')}
         ),
    )

    filter_horizontal = ()


# class ProfileAdmin(admin.ModelAdmin):
#     model = Profile
#     search_fields = ('phone',)
#     list_filter = ('phone',)
#     ordering = ('phone',)
#     list_display = ('id','phone',)

#     filter_horizontal = ()


admin.site.register(Account, AccountAdmin)
# admin.site.register(Profile, ProfileAdmin)