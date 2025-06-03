from rest_framework import serializers
from .models import User, Ambient, Historic
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

class AmbientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambient
        fields = '__all__'

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