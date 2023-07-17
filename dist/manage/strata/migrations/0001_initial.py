# Generated by Django 3.1.7 on 2022-02-24 15:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('stratifications', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stratum',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stratum', models.CharField(blank=True, max_length=50, null=True)),
                ('area', models.IntegerField(blank=True, null=True)),
                ('comment', models.CharField(blank=True, max_length=1000, null=True)),
                ('stratification', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='stratum', to='stratifications.stratification')),
            ],
            options={
                'unique_together': {('stratification', 'stratum')},
            },
        ),
    ]
