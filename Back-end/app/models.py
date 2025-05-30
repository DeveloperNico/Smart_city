from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.utils import timezone

class User(AbstractUser):
    CARGOS = [
        ('A', 'Administrador'),
        ('C', 'Comum')
    ]
    cargo = models.CharField(max_length=1, choices=CARGOS, default='A')
    
    def __str__(self):
        return self.username
    
class Sensors(models.Model):
    sensor = models.CharField(max_length=100, unique=True)
    validator_mac_address = RegexValidator(
        regex=r'^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$',
        message='Formato de endereço MAC inválido. Exemplo: 00:1A:2B:3C:4D:5E'
    )
    mac_address = models.CharField(max_length=17, unique=True, validators=[validator_mac_address])
    unidade_medida = models.CharField(max_length=10)
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.sensor
    
class Ambients(models.Model):
    sig = models.IntegerField()
    descricao = models.TextField(blank=True, null=True)
    validator_ni = RegexValidator (
        regex=r'^\d{5}/\d{2}$', 
        message='O número de identificação deve seguir o formato 12345/67'
    )
    ni = models.CharField(max_length=8, blank=True, null=True, unique=True, validators=[validator_ni])
    responsavel = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return f"{self.sig} - {self.descricao or 'Sem descrição'}"

class Historic(models.Model):
    valor = models.FloatField()
    timestamp = models.IntegerField()
    sensor = models.ForeignKey(Sensors, on_delete=models.CASCADE, related_name='historics')
    ambient = models.ForeignKey(Ambients, on_delete=models.CASCADE, related_name='historics')

    class Meta:
        verbose_name_plural = 'Historics'

    def __str__(self):
        return self.sensor.sensor + " - " + str(self.valor) + " at " + timezone.localtime(timezone.now()).strftime('%Y-%m-%d %H:%M:%S')
