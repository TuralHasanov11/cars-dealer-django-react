from django.contrib import admin
from account.models import Account, Profile
from django.contrib.auth.admin import UserAdmin


class ProfileAdmin(admin.StackedInline):
    model = Profile


class AccountAdmin(UserAdmin):
    model = Account
    search_fields = ('email', 'username')
    list_filter = ('email', 'username','is_active', 'is_staff')
    ordering = ()
    list_display = ('email', 'username',
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
    inlines = [ProfileAdmin]
    filter_horizontal = ()


admin.site.register(Account, AccountAdmin)
