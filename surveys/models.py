from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator


class Survey(models.Model):
    stratification = models.ForeignKey('stratifications.Stratification', on_delete=models.PROTECT, )
    acronym = models.CharField(unique=True, max_length=3, blank=False, validators=[
        RegexValidator(regex='^[a-zA-Z0-9]*$', message='Description must be alphanumeric.',
            code='invalid_username')
    ])  # CLAV
    description = models.CharField(max_length=30, null=False, blank=False, validators=[
        RegexValidator(regex='^[a-zA-Z0-9\s]*$',message='Description must be alphanumeric. White spaces are '
                                                             'allowed.',
            code='invalid_username')
    ])  # IDENT
    start_date = models.DateField(null=True, blank=True)  # COMI
    end_date = models.DateField(null=True, blank=True)  # FINA
    width_x = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(180)],
                                  null=True, blank=True)  # CUX
    width_y = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(90)],
                                  null=True, blank=True)  # CUY
    origin_x = models.DecimalField(max_digits=4, decimal_places=2,
                                   validators=[MinValueValidator(-180), MaxValueValidator(180)],
                                   null=True, blank=True)  # OCUX
    origin_y = models.DecimalField(max_digits=4, decimal_places=2,
                                   validators=[MinValueValidator(-90), MaxValueValidator(90)],
                                   null=True, blank=True)  # OCUY
    ship = models.CharField(max_length=4, null=True, blank=True)
    hauls_duration = models.IntegerField(null=True, blank=True)
    # ew = models.CharField(max_length=2, null=True, blank=True)
    # ns = models.CharField(max_length=2, null=True, blank=True)
    # area_sampled = models.CharField(max_length=2, null=True, blank=True)
    unit_sample = models.IntegerField(null=True, blank=True)
    comment = models.CharField(max_length=1000, null=True, blank=True)
