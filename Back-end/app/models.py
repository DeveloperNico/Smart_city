from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

class User(AbstractUser):
    CARGOS = [
        ('A', 'Administrador'),
        ('C', 'Comum')
    ]
    cargo = models.CharField(max_length=1, choices=CARGOS, default='A')
    
    def __str__(self):
        return self.username
    
class Sensor(models.Model):
    sensor = models.CharField(max_length=100)
    validator_mac_address = RegexValidator(
        regex=r'^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$',
        message='Formato de endereço MAC inválido. Exemplo: 00:1A:2B:3C:4D:5E'
    )
    mac_address = models.CharField(max_length=17, validators=[validator_mac_address])
    unidade_medida = models.CharField(max_length=10)
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.sensor

class Ambient(models.Model):
    validator_sig = RegexValidator(
        regex=r'^[0-9]{8}$',
        message='O SIG deve conter exatamente 8 números.'
    )
    sig = models.IntegerField(validators=[validator_sig])
    descricao = models.CharField(max_length=20, blank=True, null=True)
    validator_ni = RegexValidator (
        regex=r'^(SN\d{5}|\d{7})$',
        message='O NI deve ser no formato SNXXXXX ou XXXXXXX (onde X é um dígito).'
    )
    ni = models.CharField(max_length=8, blank=True, null=True, validators=[validator_ni])
    responsavel = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return f"{self.sig} - {self.descricao or 'Sem descrição'}"

class Historic(models.Model):
    valor = models.FloatField()
    timestamp = models.DateTimeField(blank=True, null=True)

    sensor_content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='sensor_historic', blank=True, null=True)
    sensor_object_id = models.PositiveIntegerField(blank=True, null=True)
    sensor = GenericForeignKey('sensor_content_type', 'sensor_object_id')

    ambient_content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, related_name='ambient_historic', blank=True, null=True)
    ambient_object_id = models.PositiveIntegerField(blank=True, null=True)
    ambient = GenericForeignKey('ambient_content_type', 'ambient_object_id')

    class Meta:
        verbose_name_plural = 'Historics'

    def __str__(self):
        return self.sensor.sensor + " - " + str(self.valor) + " at " + timezone.localtime(timezone.now()).strftime('%Y-%m-%d %H:%M:%S')
