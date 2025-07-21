from django.db import models

from django.db.models import UniqueConstraint
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator


class Ship(models.Model):
    name = models.CharField(max_length=30, unique=True)
    datras_id = models.CharField(validators=[
        RegexValidator(regex='^[\w]{2,4}$', message='Between 2 and 4 characters, only alphanumeric.',
                       code='invalid_datras_id')
    ], max_length=4, null=True)
    length = models.DecimalField(validators=[MinValueValidator(0), MaxValueValidator(999.99)], max_digits=5,
                                 decimal_places=2, null=True)  # in meters
    beam = models.DecimalField(validators=[MinValueValidator(0), MaxValueValidator(99.99)], max_digits=4,
                               decimal_places=2, null=True)  # in meters
    main_power = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(9999)], null=True)  # in kW
    year_built = models.IntegerField(validators=[MinValueValidator(1900), MaxValueValidator(9999)], null=True)
    comment = models.CharField(max_length=500, null=True)

    def __unicode__(self):
        return self.name
