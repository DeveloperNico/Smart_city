from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

# Modelo de usuário personalizado estendendo AbstractUser
class User(AbstractUser):
    # Define os tipos de cargo possíveis
    CARGOS = [
        ('A', 'Administrador'),
        ('C', 'Comum')
    ]

    # Campo que armazena o tipo de cargo do usuário
    cargo = models.CharField(max_length=1, choices=CARGOS, default='A')
    
    def __str__(self):
        # Retorna o nome de usuário como representação textual do objeto
        return self.username

# Modelo para representar sensores
class Sensor(models.Model):
    # Nome ou identificação do sensor
    sensor = models.CharField(max_length=100)

    # Validador para o endereço MAC do sensor
    validator_mac_address = RegexValidator(
        regex=r'^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$',
        message='Formato de endereço MAC inválido. Exemplo: 00:1A:2B:3C:4D:5E'
    )

    # Endereço MAC do sensor, com validador aplicado
    mac_address = models.CharField(max_length=17, validators=[validator_mac_address])

    # Unidade de medida (ex: ºC, ppm, etc.)
    unidade_medida = models.CharField(max_length=10)

    # Coordenadas geográficas do sensor
    latitude = models.FloatField()
    longitude = models.FloatField()

    # Indica se o sensor está ativo ou inativo
    status = models.BooleanField(default=True)

    def __str__(self):
        # Retorna o nome do sensor como representação textual
        return self.sensor

# Modelo que representa um ambiente monitorado
class Ambient(models.Model):
    # Validador para o campo SIG (código de identificação do ambiente)
    validator_sig = RegexValidator(
        regex=r'^[0-9]{8}$',
        message='O SIG deve conter exatamente 8 números.'
    )

    # Código SIG do ambiente
    sig = models.IntegerField(validators=[validator_sig])

    # Descrição opcional do ambiente
    descricao = models.CharField(max_length=100, blank=True, null=True)

    # Validador para o campo NI (Número de Identificação de patrimônio)
    validator_ni = RegexValidator(
        regex=r'^(SN\d{5}|\d{7})$',
        message='O NI deve ser no formato SNXXXXX ou XXXXXXX (onde X é um dígito).'
    )

    # Número de identificação do patrimônio (opcional)
    ni = models.CharField(max_length=10, blank=True, null=True, validators=[validator_ni])

    # Nome do responsável pelo ambiente (opcional)
    responsavel = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        # Retorna o SIG e a descrição (ou "Sem descrição" se for nula)
        return f"{self.sig} - {self.descricao or 'Sem descrição'}"

# Modelo que armazena os registros históricos de medições
class Historic(models.Model):
    # Valor registrado pelo sensor
    valor = models.FloatField()

    # Data e hora do registro
    timestamp = models.DateTimeField(blank=True, null=True)

    # Chave estrangeira genérica para associar a um sensor (pode ser qualquer tipo de sensor)
    sensor_content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='sensor_historic', blank=True, null=True)
    sensor_object_id = models.PositiveIntegerField(blank=True, null=True)
    sensor = GenericForeignKey('sensor_content_type', 'sensor_object_id')

    # Chave estrangeira genérica para associar a um ambiente
    ambient_content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='ambient_historic', blank=True, null=True)
    ambient_object_id = models.PositiveIntegerField(blank=True, null=True)
    ambient = GenericForeignKey('ambient_content_type', 'ambient_object_id')

    class Meta:
        # Nome plural personalizado para aparecer corretamente no admin
        verbose_name_plural = 'Historics'

    def __str__(self):
        # Retorna uma string com o nome do sensor, valor e data formatada
        sensor_name = getattr(self.sensor, 'sensor', 'UnknownSensor')
        return f"{sensor_name} - {self.valor} at {self.timestamp.strftime('%Y-%m-%d %H:%M:%S') if self.timestamp else 'No Timestamp'}"