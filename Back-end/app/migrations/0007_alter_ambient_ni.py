# Generated by Django 5.2 on 2025-05-30 13:04

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_alter_ambient_ni'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ambient',
            name='ni',
            field=models.CharField(blank=True, max_length=8, null=True, unique=True, validators=[django.core.validators.RegexValidator(message='O NI deve ser no formato SNXXXXX ou XXXXXXX (onde X é um dígito).', regex='^(SN\\d{5}|\\d{7})$')]),
        ),
    ]
