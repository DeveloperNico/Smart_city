from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from .serializers import UserSerializer, SensorsSerializer, AmbientsSerializer, HistoricSerializer, LoginSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import User, Sensor, Ambient, Historic
from .permissions import IsAdmin
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
import pandas as pd

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

class importSensorsExcelView(APIView):
    perser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        excel_file = request.FILES.get('files')
        if not excel_file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            df = pd.read_excel(excel_file)

            for _, row in df.iterrows():
                Sensor.objects.create(
                    sensor=row['sensor'],
                    mac_address=row['mac_address'],
                    unidade_medida=row['unidade_medida'],
                    latitude=row['latitude'],
                    longitude=row['longitude'],
                    status=row['status'] in [True, 'True', 'true', 1],
                )

            return Response({"message": "Sensors imported successfully"}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

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