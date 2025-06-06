# Generated by Django 5.2 on 2025-06-05 10:54

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_remove_historic_ambient'),
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sensor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sensor', models.CharField(max_length=100)),
                ('mac_address', models.CharField(max_length=17, validators=[django.core.validators.RegexValidator(message='Formato de endereço MAC inválido. Exemplo: 00:1A:2B:3C:4D:5E', regex='^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$')])),
                ('unidade_medida', models.CharField(max_length=10)),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('status', models.BooleanField(default=True)),
            ],
        ),
        migrations.RenameField(
            model_name='historic',
            old_name='object_id',
            new_name='ambient_object_id',
        ),
        migrations.RemoveField(
            model_name='historic',
            name='content_type',
        ),
        migrations.AddField(
            model_name='historic',
            name='ambient_content_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ambient_historic', to='contenttypes.contenttype'),
        ),
        migrations.AddField(
            model_name='historic',
            name='sensor_content_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sensor_historic', to='contenttypes.contenttype'),
        ),
        migrations.AddField(
            model_name='historic',
            name='sensor_object_id',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
