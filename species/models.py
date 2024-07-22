from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from django.db.models import UniqueConstraint

from species.validators import group_validator


class Sp(models.Model):
    group = models.IntegerField(validators=[group_validator], null=True, blank=True)
    sp_code = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(9999)], null=True, blank=True)
    sp_name = models.CharField(max_length=50, null=True, blank=True)
    spanish_name = models.CharField(max_length=50, null=True, blank=True)
    a_param = models.DecimalField(max_digits=7, decimal_places=6, null=True, blank=True)
    b_param = models.DecimalField(max_digits=7, decimal_places=6, null=True, blank=True)
    # unit = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(1)], null=True, blank=True)
    # increment = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(9)], null=True, blank=True)
    APHIA = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(999999)], null=True, blank=True)
    comment = models.CharField(max_length=1000, null=True, blank=True)
    measurement_type = models.ForeignKey('MeasurementType', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        constraints = [
            UniqueConstraint(fields=['group', 'sp_code'], name='unique_field')
        ]

    def __unicode__(self):
        return self.sp_name


class MeasurementType(models.Model):
    name = models.CharField(max_length=6, unique=True)
    increment = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(9999)])
    # The conversion factor is a number used to multiply the units of measurement to convert them to millimeters
    # For example, for a measurement type "cm", the conversion factor must be 10.
    conversion_factor = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(9999)])
    # UNITS_CHOICES = [
    #     ('cm', 'Centimeters'),
    #     ('mm', 'Millimeters'),
    # ]
    # unit = models.CharField(max_length=2, choices=UNITS_CHOICES)
