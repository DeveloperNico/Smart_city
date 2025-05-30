from django.contrib import admin
from .models import User, Sensor, Ambient, Historic
from django.contrib.auth.admin import UserAdmin

class UsuarioAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Novos campos', {'fields': ('cargo',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('cargo',)}),
    )

admin.site.register(User, UsuarioAdmin)
admin.site.register(Sensor)
admin.site.register(Ambient)
admin.site.register(Historic)