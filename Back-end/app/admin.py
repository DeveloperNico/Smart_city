from django.contrib import admin
from .models import User, Ambient, Historic, Sensor
from django.contrib.auth.admin import UserAdmin

# Cria uma classe personalizada para o modelo User, estendendo o UserAdmin
class UsuarioAdmin(UserAdmin):
    # Adiciona o campo personalizado 'cargo' nas seções de visualização/edição do usuário
    fieldsets = UserAdmin.fieldsets + (
        ('Novos campos', {'fields': ('cargo',)}),
    )

    # Adiciona o campo 'cargo' também no formulário de criação de usuário
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('cargo',)}),
    )

# Registra o modelo User com a configuração personalizada de admin
admin.site.register(User, UsuarioAdmin)

# Registra os demais modelos no admin com configurações padrão
admin.site.register(Sensor)
admin.site.register(Ambient)
admin.site.register(Historic)
