from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from surveys.models import Survey
from strata.models import Stratum
from stations.models import Station
from gears.models import Trawl


class Haul(models.Model):
    station = models.ForeignKey(
        'stations.Station', on_delete=models.CASCADE, related_name='hauls')
    stratum = models.ForeignKey(
        'strata.Stratum', null=True, blank=True, on_delete=models.CASCADE)
    sampler = models.ForeignKey('samplers.Sampler', on_delete=models.CASCADE)
    haul = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(99)])
    # gear = models.PositiveIntegerField(null=True, blank=True)
    # valid = models.BooleanField(null=True, blank=True)
    valid = models.BooleanField(default=True)
    special = models.BooleanField(default=False)

    SAMPLER_TYPE_CHOICES = [
        ('trawl', 'Trawl'),
        ('ctd', 'CTD'),
    ]

    sampler_type = models.CharField(
        max_length=11,
        choices=SAMPLER_TYPE_CHOICES,
        null=True,
        blank=True,
    )

    trawl = models.ForeignKey(
        'gears.Trawl',
        # on_delete=models.SET_NULL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    ctd = models.ForeignKey(
        'gears.CTD',
        # on_delete=models.SET_NULL,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    # right now, the gear field can be null because there are no gear for ctd. Gear field is really only
    # for trawls
    # TODO: fix the gears models to accommodate multiple type of gears. Maybe put inside Samplers.
    # gear = models.ForeignKey('gears.Trawl', null=True,
    #                          blank=True, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('station', 'stratum', 'sampler', 'haul', 'trawl', 'ctd',)


class Meteorology(models.Model):
    haul = models.OneToOneField(
        'hauls.Haul', on_delete=models.CASCADE, related_name='meteo')
    wind_direction = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(360)], null=True,
                                                 blank=True)
    wind_velocity = models.DecimalField(validators=[MinValueValidator(0), MaxValueValidator(99.9)], max_digits=3,
                                        decimal_places=1, null=True, blank=True)
    sea_state = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(9)], null=True,
                                            blank=True)


class HaulTrawl(models.Model):
    haul = models.OneToOneField(
        'hauls.Haul', on_delete=models.CASCADE, related_name='trawl_characteristics')

    # Shooting
    shooting_date_time = models.DateTimeField(null=True, blank=True)
    shooting_latitude = models.DecimalField(validators=[MinValueValidator(-90), MaxValueValidator(90)], max_digits=9,
                                            decimal_places=6, null=True, blank=True)
    shooting_longitude = models.DecimalField(validators=[MinValueValidator(-180), MaxValueValidator(180)],
                                             max_digits=10,
                                             decimal_places=6, null=True, blank=True)
    shooting_depth = models.PositiveIntegerField(
        validators=[MaxValueValidator(9999)], null=True, blank=True)

    # ---- Start coordinates ----
    # Bottom
    bottom_date_time = models.DateTimeField(null=True, blank=True)
    bottom_latitude = models.DecimalField(validators=[MinValueValidator(-90), MaxValueValidator(90)], max_digits=9,
                                          decimal_places=6, null=True, blank=True)
    bottom_longitude = models.DecimalField(validators=[MinValueValidator(-180), MaxValueValidator(180)], max_digits=10,
                                           decimal_places=6, null=True, blank=True)
    bottom_depth = models.PositiveIntegerField(
        validators=[MaxValueValidator(9999)], null=True, blank=True)

    # Trawling
    trawling_date_time = models.DateTimeField(null=True, blank=True)
    trawling_latitude = models.DecimalField(validators=[MinValueValidator(-90), MaxValueValidator(90)], max_digits=9,
                                            decimal_places=6, null=True, blank=True)
    trawling_longitude = models.DecimalField(validators=[MinValueValidator(-180), MaxValueValidator(180)],
                                             max_digits=10,
                                             decimal_places=6, null=True, blank=True)
    trawling_depth = models.PositiveIntegerField(
        validators=[MaxValueValidator(9999)], null=True, blank=True)

    # Hauling
    hauling_date_time = models.DateTimeField(null=True, blank=True)
    hauling_latitude = models.DecimalField(validators=[MinValueValidator(-90), MaxValueValidator(90)], max_digits=9,
                                           decimal_places=6, null=True, blank=True)
    hauling_longitude = models.DecimalField(validators=[MinValueValidator(-180), MaxValueValidator(180)], max_digits=10,
                                            decimal_places=6, null=True, blank=True)
    hauling_depth = models.PositiveIntegerField(
        validators=[MaxValueValidator(9999)], null=True, blank=True)

    # Take off
    take_off_date_time = models.DateTimeField(null=True, blank=True)
    take_off_latitude = models.DecimalField(validators=[MinValueValidator(-90), MaxValueValidator(90)], max_digits=9,
                                            decimal_places=6, null=True, blank=True)
    take_off_longitude = models.DecimalField(validators=[MinValueValidator(-180), MaxValueValidator(180)],
                                             max_digits=10,
                                             decimal_places=6, null=True, blank=True)
    take_off_depth = models.PositiveIntegerField(
        validators=[MaxValueValidator(9999)], null=True, blank=True)

    # On board
    on_board_date_time = models.DateTimeField(null=True, blank=True)
    on_board_latitude = models.DecimalField(validators=[MinValueValidator(-90), MaxValueValidator(90)], max_digits=9,
                                            decimal_places=6, null=True, blank=True)
    on_board_longitude = models.DecimalField(validators=[MinValueValidator(-180), MaxValueValidator(180)],
                                             max_digits=10,
                                             decimal_places=6, null=True, blank=True)
    on_board_depth = models.PositiveIntegerField(
        validators=[MaxValueValidator(9999)], null=True, blank=True)
    # ---- End coordinates ----

    course = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(360)], null=True,
                                         blank=True)
    velocity = models.DecimalField(validators=[MinValueValidator(0), MaxValueValidator(99)], max_digits=3,
                                   decimal_places=1, null=True, blank=True)
    cable = models.PositiveIntegerField(
        validators=[MaxValueValidator(9999)], null=True, blank=True)
    sweep = models.PositiveIntegerField(
        validators=[MaxValueValidator(999)], null=True, blank=True)
    otter_boards_distance = models.DecimalField(validators=[MinValueValidator(0), MaxValueValidator(999)], max_digits=4,
                                                decimal_places=1, null=True, blank=True)
    horizontal_aperture = models.DecimalField(validators=[MinValueValidator(0), MaxValueValidator(99)], max_digits=3,
                                              decimal_places=1, null=True, blank=True)
    vertical_aperture = models.DecimalField(validators=[MinValueValidator(0), MaxValueValidator(99)], max_digits=3,
                                            decimal_places=1, null=True, blank=True)
    sampling_rectangle = models.PositiveIntegerField(
        validators=[MaxValueValidator(99)], null=True, blank=True)
    track = models.PositiveIntegerField(
        validators=[MaxValueValidator(9999)], null=True, blank=True)

    comment = models.CharField(max_length=1000, null=True, blank=True)


class HaulHydrography(models.Model):
    haul = models.OneToOneField(
        'hauls.Haul', on_delete=models.CASCADE, related_name='hydrography_characteristics')

    latitude = models.DecimalField(validators=[MinValueValidator(-90), MaxValueValidator(90)], max_digits=9,
                                   decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(validators=[MinValueValidator(-180), MaxValueValidator(180)], max_digits=10,
                                    decimal_places=6, null=True, blank=True)

    date_time = models.DateTimeField(null=True, blank=True)
    depth_probe = models.PositiveIntegerField(null=True, blank=True, validators=[
        MinValueValidator(0), MaxValueValidator(9999)])
    cable = models.PositiveIntegerField(null=True, blank=True, validators=[
        MinValueValidator(0), MaxValueValidator(9999)])
    depth = models.PositiveIntegerField(null=True, blank=True, validators=[
        MinValueValidator(0), MaxValueValidator(9999)])
    temperature_0 = models.DecimalField(
        max_digits=5, decimal_places=3, null=True, blank=True)
    salinity_0 = models.DecimalField(
        max_digits=5, decimal_places=3, null=True, blank=True)
    sigma_0 = models.PositiveIntegerField(null=True, blank=True)
    temperature_50 = models.DecimalField(
        max_digits=5, decimal_places=3, null=True, blank=True)
    salinity_50 = models.DecimalField(
        max_digits=5, decimal_places=3, null=True, blank=True)
    sigma_50 = models.PositiveIntegerField(null=True, blank=True)
    temperature_100 = models.DecimalField(
        max_digits=5, decimal_places=3, null=True, blank=True)
    salinity_100 = models.DecimalField(
        max_digits=5, decimal_places=3, null=True, blank=True)
    sigma_100 = models.PositiveIntegerField(null=True, blank=True)
    temperature = models.DecimalField(
        max_digits=5, decimal_places=3, null=True, blank=True)
    salinity = models.DecimalField(
        max_digits=5, decimal_places=3, null=True, blank=True)
    sigma = models.PositiveIntegerField(null=True, blank=True)

    comment = models.CharField(max_length=1000, null=True, blank=True)
