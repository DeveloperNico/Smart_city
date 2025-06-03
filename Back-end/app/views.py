from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from .serializers import UserSerializer, AmbientsSerializer, HistoricSerializer, LoginSerializer, SensorCounterSerializer, SensorHumiditySerializer, SensorLuminositySerializer, SensorTemperatureSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import User, Ambient, Historic, SensorCounter, SensorLuminosity, SensorTemperature, SensorHumidity
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

# Classe para importar sensores de luminosidade via Excel
class importSensorsCounterExcelView(APIView):
    perser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        excel_file = request.FILES.get('file')
        if not excel_file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            df = pd.read_excel(excel_file)

            for _, row in df.iterrows():
                SensorCounter.objects.create(
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

# Classe para importar sensores de temperatura via Excel
class importSensorsTemperatureExcelView(APIView):
    perser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        excel_file = request.FILES.get('file')
        if not excel_file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            df = pd.read_excel(excel_file)

            for _, row in df.iterrows():
                SensorTemperature.objects.create(
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

# Classe para importar sensores de umidade via Excel
class importSensorsHumidityExcelView(APIView):
    perser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        excel_file = request.FILES.get('file')
        if not excel_file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            df = pd.read_excel(excel_file)

            for _, row in df.iterrows():
                SensorHumidity.objects.create(
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
        
# Classe para importar sensores de luminosidade via Excel
class importSensorsLuminosityExcelView(APIView):
    perser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        excel_file = request.FILES.get('file')
        if not excel_file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            df = pd.read_excel(excel_file)

            for _, row in df.iterrows():
                SensorLuminosity.objects.create(
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
        
# Classe para importar ambientes via Excel
class importAmbientsExcelView(APIView):
    perser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        excel_file = request.FILES.get('file')
        if not excel_file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            df = pd.read_excel(excel_file)

            for _, row in df.iterrows():
                Ambient.objects.create(
                    sig=row['sig'],
                    descricao=row['descricao'],
                    ni= row['ni'],
                    responsavel=row['responsavel'],
                )

            return Response({"message": "Ambients imported successfully"}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
# Classe para importar histórico via Excel
class importHistoricExcelView(APIView):
    perser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        excel_file = request.FILES.get('file')
        if not excel_file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            df = pd.read_excel(excel_file)

            for _, row in df.iterrows():
                Historic.objects.create(
                    sensor= row['sensor'],
                    ambient= row['ambient'],
                    valor=row['valor'],
                    timestamp=row['timestamp']
                )

            return Response({"message": "Historic imported successfully"}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Classes para fazer o GET, POST, UPDATE e DELETE do sensor de contador        
class SensorCounterListCreateView(ListCreateAPIView):
    queryset = SensorCounter.objects.all()
    serializer_class = SensorCounterSerializer
    permission_classes = [IsAuthenticated]

class SensorCounterRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = SensorCounter.objects.all()
    serializer_class = SensorCounterSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

# Classes para fazer o GET, POST, UPDATE e DELETE do sensor de temperatura
class SensorTemperatureListCreateView(ListCreateAPIView):
    queryset = SensorTemperature.objects.all()
    serializer_class = SensorTemperatureSerializer
    permission_classes = [IsAuthenticated]

class SensorTemperatureRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = SensorTemperature.objects.all()
    serializer_class = SensorTemperatureSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

# Classes para fazer o GET, POST, UPDATE e DELETE do sensor de umidade
class SensorHumidityListCreateView(ListCreateAPIView):
    queryset = SensorHumidity.objects.all()
    serializer_class = SensorHumiditySerializer
    permission_classes = [IsAuthenticated]

class SensorHumidityRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = SensorHumidity.objects.all()
    serializer_class = SensorHumiditySerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

# Classes para fazer o GET, POST, UPDATE e DELETE do sensor de luminosidade
class SensorLuminosityListCreateView(ListCreateAPIView):
    queryset = SensorLuminosity.objects.all()
    serializer_class = SensorLuminositySerializer
    permission_classes = [IsAuthenticated]

class SensorLuminosityRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = SensorLuminosity.objects.all()
    serializer_class = SensorLuminositySerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

# Classes para fazer o GET, POST, UPDATE e DELETE dos ambientes
class AmbientsListCreateView(ListCreateAPIView):
    queryset = Ambient.objects.all()
    serializer_class = AmbientsSerializer
    permission_classes = [IsAuthenticated]

class AmbientsRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Ambient.objects.all()
    serializer_class = AmbientsSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

# Classes para fazer o GET, POST, UPDATE e DELETE do histórico
class HistoricListCreateView(ListCreateAPIView):
    queryset = Historic.objects.all()
    serializer_class = HistoricSerializer
    permission_classes = [IsAuthenticated]

class HistoricRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Historic.objects.all()
    serializer_class = HistoricSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'