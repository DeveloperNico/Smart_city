# Generated by Django 5.2 on 2025-06-03 14:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_alter_ambient_ni_alter_ambient_sig'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='historic',
            name='ambient',
        ),
    ]
