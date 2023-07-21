# Generated by Django 3.1.7 on 2022-04-27 13:07

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hauls', '0006_auto_20220427_1428'),
    ]

    operations = [
        migrations.AlterField(
            model_name='haultrawl',
            name='bottom_depth',
            field=models.PositiveIntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(9999)]),
        ),
        migrations.AlterField(
            model_name='haultrawl',
            name='hauling_depth',
            field=models.PositiveIntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(9999)]),
        ),
        migrations.AlterField(
            model_name='haultrawl',
            name='shooting_depth',
            field=models.PositiveIntegerField(blank=True, null=True, validators=[django.core.validators.MaxValueValidator(9999)]),
        ),
    ]
