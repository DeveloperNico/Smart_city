# Generated by Django 5.2 on 2025-06-13 03:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0017_alter_ambient_ni'),
    ]

    operations = [
        migrations.AddField(
            model_name='sensor',
            name='tipo',
            field=models.CharField(choices=[('temperatura', 'Temperatura'), ('umidade', 'Umidade'), ('luminosidade', 'Luminosidade'), ('contador', 'Contador')], default='Temperatura', max_length=20),
        ),
    ]
