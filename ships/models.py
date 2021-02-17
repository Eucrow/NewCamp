from django.db import models

from django.db.models import UniqueConstraint


class Ship(models.Model):
    name = models.CharField(max_length=100, unique=True)
    datras_id = models.CharField(max_length=4, null=True)
    length = models.IntegerField(null=True) # in meters
    beam = models.DecimalField(max_digits=4, decimal_places=2, null=True) # in meters
    main_power = models.IntegerField(null=True) #in kW
    year_built =  models.IntegerField(null=True)
    comment = models.CharField(max_length=500, null=True)

    class Meta:
        constraints = [
            UniqueConstraint(fields=['name', 'datras_id'], name='unique_ship')
        ]

    def __unicode__(self):
        return self.name