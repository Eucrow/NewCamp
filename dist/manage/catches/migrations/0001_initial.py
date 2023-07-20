# Generated by Django 3.1.7 on 2022-02-24 15:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('species', '0001_initial'),
        ('hauls', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Catch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.IntegerField()),
                ('category', models.PositiveSmallIntegerField()),
                ('haul', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hauls.haul')),
                ('sp', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='species.sp')),
            ],
            options={
                'unique_together': {('haul', 'sp', 'category')},
            },
        ),
    ]
