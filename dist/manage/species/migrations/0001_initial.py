# Generated by Django 3.1.7 on 2022-02-24 15:19

from django.db import migrations, models
import species.validators


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group', models.IntegerField(blank=True, null=True, validators=[species.validators.group_validator])),
                ('sp_code', models.IntegerField(blank=True, null=True)),
                ('sp_name', models.CharField(blank=True, max_length=50, null=True)),
                ('spanish_name', models.CharField(blank=True, max_length=50, null=True)),
                ('a_param', models.DecimalField(blank=True, decimal_places=6, max_digits=7, null=True)),
                ('b_param', models.DecimalField(blank=True, decimal_places=6, max_digits=7, null=True)),
                ('l_infinity', models.IntegerField(blank=True, null=True)),
                ('k', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True)),
                ('t_zero', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True)),
                ('unit', models.IntegerField(blank=True, null=True)),
                ('increment', models.IntegerField(blank=True, null=True)),
                ('trophic_group', models.IntegerField(blank=True, null=True)),
                ('APHIA', models.IntegerField(blank=True, null=True)),
                ('comment', models.CharField(blank=True, max_length=1000, null=True)),
            ],
        ),
        migrations.AddConstraint(
            model_name='sp',
            constraint=models.UniqueConstraint(fields=('group', 'sp_code'), name='unique_field'),
        ),
    ]