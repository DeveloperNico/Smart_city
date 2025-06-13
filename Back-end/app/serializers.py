from rest_framework import serializers
from .models import User, Ambient, Historic, Sensor
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Serializer para o modelo User, com criação personalizada de senha
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Campos que serão expostos no JSON
        fields = ['id', 'username', 'email', 'password', 'cargo']
        # Define o campo password como write-only (não é retornado nas respostas)
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Remove a senha dos dados validados
        password = validated_data.pop('password', None)

        # Cria uma instância do usuário com os dados restantes
        user = User(**validated_data)

        # Define a senha de forma segura (criptografada)
        user.set_password(password)

        # Salva o novo usuário no banco de dados
        user.save()

        return user

# Serializer para o modelo Sensor
class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        # Campos que serão incluídos no JSON
        fields = ['sensor', 'mac_address', 'unidade_medida', 'latitude', 'longitude', 'status']
        extra_kwargs = {
            # Desativa a validação do MAC address no serializer
            'mac_address': {'validators': []}
        }

# Serializer padrão para o modelo Ambient
class AmbientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambient
        # Inclui todos os campos do modelo
        fields = '__all__'

# Serializer padrão para o modelo Historic
class HistoricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historic
        # Inclui todos os campos do modelo
        fields = '__all__'

# Serializer personalizado para login com JWT
class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Valida as credenciais usando o serializer base
        data = super().validate(attrs)

        # Adiciona informações do usuário autenticado à resposta
        data['user'] = {
            'username': self.user.username,
            'cargo': self.user.cargo
        }

        return data
