from rest_framework import serializers
from .models import User, Ambient, Historic, Sensor
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'cargo']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = ['id', 'sensor', 'mac_address', 'unidade_medida', 'latitude', 'longitude', 'status']  # Incluído 'id'
        extra_kwargs = {
            'mac_address': {'validators': []}
        }

class AmbientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambient
        fields = '__all__'

class HistoricSerializer(serializers.ModelSerializer):
    sensor_name = serializers.SerializerMethodField()
    ambient_name = serializers.SerializerMethodField()

    class Meta:
        model = Historic
        fields = '__all__'  # ou especifique os campos que quiser
        # Adiciona os campos derivados no final para retornar o nome do sensor e ambiente

    def get_sensor_name(self, obj):
        if obj.sensor:
            return obj.sensor.sensor  # acessa o campo 'sensor' do objeto relacionado
        return None

    def get_ambient_name(self, obj):
        if obj.ambient:
            return obj.ambient.descricao or obj.ambient.nome or 'Desconhecido'
        return 'Desconhecido'

# Serializer de login JWT permanece igual
class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'username': self.user.username,
            'cargo': self.user.cargo
        }
        return data
