# Generated by Django 3.1.7 on 2022-03-23 11:48

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hauls', '0003_auto_20220323_1240'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meteorology',
            name='sea_state',
            field=models.PositiveIntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(9)]),
        ),
        migrations.AlterField(
            model_name='meteorology',
            name='wind_direction',
            field=models.PositiveIntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(360)]),
        ),
        migrations.AlterField(
            model_name='meteorology',
            name='wind_velocity',
            field=models.DecimalField(blank=True, decimal_places=1, max_digits=3, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(99.9)]),
        ),
    ]