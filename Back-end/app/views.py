from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from .serializers import UserSerializer, AmbientsSerializer, HistoricSerializer, LoginSerializer, SensorSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import User, Ambient, Historic, Sensor
from .permissions import IsAdmin
from rest_framework import status
from django.contrib.contenttypes.models import ContentType  
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import HttpResponse
import pandas as pd
from django.utils.dateparse import parse_datetime
import io

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_me(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class Register(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User create successfuly."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Classe de login utilizando JWT com serializer personalizado
class Login(TokenObtainPairView):
    serializer_class = LoginSerializer

# Classe para listar e criar usuários (restrita a admins)
class UserListCreateView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]

# Classe para recuperar, atualizar e deletar usuários (restrita a admins)
class UserRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]
    lookup_field = 'pk'

# Classe para importar todos sensores via Excel
class ImportSensorsExcelView(APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        # Recupera todos os arquivos enviados com o nome 'files'
        excel_files = request.FILES.getlist('files')
        if not excel_files:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            total_imported = 0

            # Itera sobre cada arquivo recebido
            for excel_file in excel_files:
                df = pd.read_excel(excel_file)  # Lê o Excel em um DataFrame

                # Para cada linha no Excel, cria um novo Sensor
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
            # Retorna erro caso algo falhe
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Classe para importar ambientes via Excel
class ImportAmbientsExcelView(APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        # Recupera o arquivo Excel enviado com o nome 'file'
        excel_file = request.FILES.get('file')
        if not excel_file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            df = pd.read_excel(excel_file)

            # Para cada linha do Excel, cria um novo Ambiente
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
class ImportHistoricExcelView(APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        # Recupera o arquivo Excel enviado com o nome 'file'
        excel_file = request.FILES.get('file')
        if not excel_file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            df = pd.read_excel(excel_file)

            # Para cada linha, busca os objetos Sensor e Ambient, e cria um histórico
            for _, row in df.iterrows():
                try:
                    sensor = Sensor.objects.get(pk=int(row['sensor']))
                    ambient = Ambient.objects.get(pk=int(row['ambiente']))

                    Historic.objects.create(
                        sensor_content_type=ContentType.objects.get_for_model(sensor),
                        sensor_object_id=sensor.id,
                        ambient_content_type=ContentType.objects.get_for_model(ambient),
                        ambient_object_id=ambient.id,
                        valor=row['valor'],
                        timestamp=row['timestamp']
                    )

                # Valida se sensor existe
                except Sensor.DoesNotExist:
                    return Response({"error": f"Sensor with ID {row['sensor']} not found."}, status=status.HTTP_400_BAD_REQUEST)
                # Valida se ambiente existe
                except Ambient.DoesNotExist:
                    return Response({"error": f"Ambient with SIG {row['ambiente']} not found."}, status=status.HTTP_400_BAD_REQUEST)
                
            return Response({"message": "Historic imported successfully"}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Classe para exportar sensores para Excel
class ExportSensorsExcelView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Coleta todos os sensores do banco de dados
        sensors = Sensor.objects.all().values(
            'id', 'sensor', 'mac_address', 'unidade_medida', 'latitude', 'longitude', 'status'
        )

        # Converte para DataFrame e cria arquivo Excel em memória
        df = pd.DataFrame(list(sensors))
        buffer = io.BytesIO()
        df.to_excel(buffer, index=False)

        buffer.seek(0)
        # Retorna resposta com Excel para download
        response = HttpResponse(buffer, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename="sensors_export.xlsx"'
        return response

# Classe para exportar ambientes para Excel
class ExportAmbientsExcelView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Coleta todos os ambientes do banco de dados
        ambients = Ambient.objects.all().values('id', 'sig', 'descricao', 'ni', 'responsavel')
        df = pd.DataFrame(list(ambients))
        buffer = io.BytesIO()
        df.to_excel(buffer, index=False)

        buffer.seek(0)
        # Retorna resposta com Excel para download
        response = HttpResponse(buffer, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename="ambients_export.xlsx"'
        return response

# Classe para exportar histórico para Excel
class ExportHistoricExcelView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        historics = Historic.objects.all().values(
            'id', 'sensor_object_id', 'ambient_object_id', 'valor', 'timestamp'
        )
        df = pd.DataFrame(list(Historic.objects.all().values()))

        # Remove o fuso horário do timestamp, se existir
        if 'timestamp' in df.columns:
            df['timestamp'] = pd.to_datetime(df['timestamp']).dt.tz_localize(None)
            
        buffer = io.BytesIO()
        df.to_excel(buffer, index=False)
        buffer.seek(0)

        # Retorna resposta com Excel para download
        response = HttpResponse(buffer, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename="historic_export.xlsx"'
        return response

# Classe para fazer o GET, POST, UPDATE e DELETE dos sensores
class SensorsListCreateView(ListCreateAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()

        # Permite filtrar sensores pelo nome via query param
        sensor = self.request.query_params.get('sensor')

        # Se o tipo for informado, filtra por tipo (campo sensor)
        if sensor:
            queryset = queryset.filter(sensor__iexact=sensor)

        return queryset

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

    def get_queryset(self):
        queryset = super().get_queryset()

        sensor_id = self.request.query_params.get('sensor_id')
        ambient_id = self.request.query_params.get('ambient_id')
        historic_id = self.request.query_params.get('historic_id')
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        sensor_type = self.request.query_params.get('sensor')

        if historic_id:
            queryset = queryset.filter(id=historic_id)

        if sensor_id:
            queryset = queryset.filter(sensor_object_id=sensor_id)

        if ambient_id:
            queryset = queryset.filter(ambient_object_id=ambient_id)

        if start_date:
            start_date_parsed = parse_datetime(start_date)
            if start_date_parsed:
                queryset = queryset.filter(timestamp__gte=start_date_parsed)

        if end_date:
            end_date_parsed = parse_datetime(end_date)
            if end_date_parsed:
                queryset = queryset.filter(timestamp__lte=end_date_parsed)

        if sensor_type:
            # Busca os sensores que possuem esse tipo e filtra os históricos por eles
            sensor_ids = Sensor.objects.filter(sensor__iexact=sensor_type).values_list('id', flat=True)
            queryset = queryset.filter(sensor_object_id__in=sensor_ids)

        return queryset

class HistoricRetriveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Historic.objects.all()
    serializer_class = HistoricSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'