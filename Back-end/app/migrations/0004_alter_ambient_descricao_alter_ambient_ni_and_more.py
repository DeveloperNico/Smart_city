# Generated by Django 5.2 on 2025-05-30 12:57

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_rename_ambients_ambient'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ambient',
            name='descricao',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='ambient',
            name='ni',
            field=models.CharField(blank=True, max_length=8, null=True, unique=True, validators=[django.core.validators.RegexValidator(message='O NI deve ser no formato SN seguido de 7 dígitos ou apenas 7 dígitos.', regex='^(SN\\d{7}|\\d{7})$')]),
        ),
        migrations.AlterField(
            model_name='ambient',
            name='sig',
            field=models.IntegerField(unique=True, validators=[django.core.validators.RegexValidator(message='O SIG deve conter exatamente 8 números.', regex='^[0-9]{8}$')]),
        ),
        migrations.AlterField(
            model_name='historic',
            name='timestamp',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
