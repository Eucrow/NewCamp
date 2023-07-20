# Generated by Django 3.1.7 on 2022-08-11 17:12

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('samples', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sex',
            name='sex',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(9)]),
        ),
    ]
