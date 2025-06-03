from rest_framework import serializers
from .models import User, Ambient, Historic, SensorTemperature, SensorHumidity, SensorLuminosity, SensorCounter
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
    
class SensorTemperatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorTemperature
        fields = '__all__'
    
class SensorHumiditySerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorHumidity
        fields = '__all__'

class SensorLuminositySerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorLuminosity
        fields = '__all__'

class AmbientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambient
        fields = '__all__'

class SensorCounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorCounter
        fields = '__all__'
        extra_kwargs = {
            'mac_address': {'validators': []} 
        }

class HistoricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historic
        fields = '__all__'

class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'username': self.user.username,
            'cargo': self.user.cargo
        }
        return data