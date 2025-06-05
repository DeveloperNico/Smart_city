from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from .serializers import UserSerializer, AmbientsSerializer, HistoricSerializer, LoginSerializer, SensorSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import User, Ambient, Historic, Sensor
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

# Classe para importar todos sensores via Excel
class importSensorsExcelView(APIView):
    perser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        excel_files = request.FILES.getlist('files')
        if not excel_files:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            total_imported = 0

            for excel_file in excel_files:
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
                    total_imported += 1

            return Response({"message": f"{total_imported} sensors successfully imported from  {len(excel_files)} files(s)."}, status=status.HTTP_201_CREATED)
        
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
        
# Classe para fazer o GET, POST, UPDATE e DELETE dos sensores
class SensorsListCreateView(ListCreateAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    permission_classes = [IsAuthenticated]

class SensorsRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
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