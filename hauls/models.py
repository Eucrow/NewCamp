from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from surveys.models import Survey
from strata.models import Stratum
from stations.models import Station


class Haul(models.Model):

    station = models.ForeignKey('stations.Station', null=True, blank=True, on_delete=models.CASCADE, related_name='hauls')
    stratum = models.ForeignKey('strata.Stratum', null=True, blank=True, on_delete=models.CASCADE)
    sampler = models.ForeignKey('samplers.Sampler', on_delete=models.CASCADE)
    haul = models.PositiveIntegerField(null=True, blank=True)
    gear = models.PositiveIntegerField(null=True, blank=True)
    valid = models.PositiveIntegerField(null=True, blank=True)
    # ESTN = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        unique_together=('station', 'stratum', 'sampler', 'haul',)


class Meteorology(models.Model):

    haul = models.ForeignKey('hauls.Haul', null=True, blank=True, on_delete=models.CASCADE)
    wind_direction = models.PositiveIntegerField(validators=[MaxValueValidator(360), MinValueValidator(0)], null=True,
                                                blank=True)
    wind_velocity = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    sea_state = models.PositiveIntegerField(null=True, blank=True)


class HaulTrawl(models.Model):

    haul = models.ForeignKey('hauls.Haul', null=True, blank=True, on_delete=models.CASCADE)
    # date = models.DateField(null=True, blank=True)
    shooting_date_time = models.DateTimeField(null=True, blank=True)
    shooting_latitude = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)
    shooting_longitude = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)
    shooting_depth = models.PositiveIntegerField(null=True, blank=True)

    hauling_date_time = models.DateTimeField(null=True, blank=True)
    hauling_latitude = models.DecimalField(max_digits=9, decimal_places=4, null=True, blank=True)
    hauling_longitude = models.DecimalField(max_digits=9, decimal_places=4, null=True, blank=True)
    hauling_depth = models.PositiveIntegerField(null=True, blank=True)

    bottom_date_time = models.DateTimeField(null=True, blank=True)
    bottom_latitude = models.DecimalField(max_digits=9, decimal_places=4, null=True, blank=True)
    bottom_longitude = models.DecimalField(max_digits=9, decimal_places=4, null=True, blank=True)
    bottom_depth = models.PositiveIntegerField(null=True, blank=True)

    course = models.PositiveIntegerField(validators=[MaxValueValidator(360), MinValueValidator(0)], null=True,
                                         blank=True)
    velocity = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    cable = models.PositiveIntegerField(null=True, blank=True)
    sweep = models.PositiveIntegerField(null=True, blank=True)
    otter_boards_distance = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)
    horizontal_aperture = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    vertical_aperture = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    grid = models.PositiveIntegerField(null=True, blank=True)
    track = models.PositiveIntegerField(null=True, blank=True)

    comment = models.CharField(max_length=1000, null=True, blank=True)


class HaulHydrography(models.Model):

    haul = models.ForeignKey('hauls.Haul', null=True, blank=True, on_delete=models.CASCADE)

    latitude = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=4, null=True, blank=True)
    date_time = models.DateTimeField(null=True, blank=True)
    depth_probe = models.PositiveIntegerField(null=True, blank=True)
    cable = models.PositiveIntegerField(null=True, blank=True)
    depth = models.PositiveIntegerField(null=True, blank=True)
    temperature_0 = models.DecimalField(max_digits=5, decimal_places=3, null=True, blank=True)
    salinity_0 = models.DecimalField(max_digits=5, decimal_places=3, null=True, blank=True)
    sigma_0 = models.PositiveIntegerField(null=True, blank=True)
    temperature_50 = models.DecimalField(max_digits=5, decimal_places=3, null=True, blank=True)
    salinity_50 = models.DecimalField(max_digits=5, decimal_places=3, null=True, blank=True)
    sigma_50 = models.PositiveIntegerField(null=True, blank=True)
    temperature_100 = models.DecimalField(max_digits=5, decimal_places=3, null=True, blank=True)
    salinity_100 = models.DecimalField(max_digits=5, decimal_places=3, null=True, blank=True)
    sigma_100 = models.PositiveIntegerField(null=True, blank=True)
    temperature = models.DecimalField(max_digits=5, decimal_places=3, null=True, blank=True)
    salinity = models.DecimalField(max_digits=5, decimal_places=3, null=True, blank=True)
    sigma = models.PositiveIntegerField(null=True, blank=True)

    comment = models.CharField(max_length=1000, null=True, blank=True)




