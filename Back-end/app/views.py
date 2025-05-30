from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, SensorsSerializer, AmbientsSerializer, HistoricSerializer, LoginSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import User, Sensor, Ambient, Historic
from .permissions import IsAdmin
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class Login(TokenObtainPairView):
    serializer_class = LoginSerializer

class UserListCreateView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

class UserRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]
    lookup_field = 'pk'

class SensorsListCreateView(ListCreateAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorsSerializer
    permission_classes = [IsAuthenticated]

class SensorsRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorsSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

class AmbientsListCreateView(ListCreateAPIView):
    queryset = Ambient.objects.all()
    serializer_class = AmbientsSerializer
    permission_classes = [IsAuthenticated]

class AmbientsRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Ambient.objects.all()
    serializer_class = AmbientsSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

class HistoricListCreateView(ListCreateAPIView):
    queryset = Historic.objects.all()
    serializer_class = HistoricSerializer
    permission_classes = [IsAuthenticated]

class HistoricRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Historic.objects.all()
    serializer_class = HistoricSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'