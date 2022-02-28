# Instead of use from django.core.exceptions import ValidationError must be use
# from rest_framework.exceptions import ValidationError, because the first one returns
# HTTP status code "500 Internal Server Error" , but the second one returns HTTP status
# code "400 Bad Request"
from rest_framework.exceptions import ValidationError
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator


class Survey(models.Model):
    stratification = models.ForeignKey('stratifications.Stratification', on_delete=models.PROTECT, )
    acronym = models.CharField(unique=True, max_length=3, blank=False, validators=[
        RegexValidator(regex='^[a-zA-Z0-9]*$', message='Description must be alphanumeric.',
                       code='invalid_acronym')
    ])  # CLAV
    description = models.CharField(max_length=30, null=False, blank=False, validators=[
        RegexValidator(regex='^[a-zA-Z0-9\s]*$', message='Description must be alphanumeric. White spaces are '
                                                         'allowed.',
                       code='invalid_description')
    ])  # IDENT
    start_date = models.DateField(null=True, blank=True)  # COMI
    end_date = models.DateField(null=True, blank=True)  # FINA
    width_x = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(999)],
                                  null=True, blank=True)  # CUX
    width_y = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(999)],
                                  null=True, blank=True)  # CUY
    origin_x = models.DecimalField(max_digits=7, decimal_places=4,
                                   validators=[MinValueValidator(-180), MaxValueValidator(180)],
                                   null=True, blank=True)  # OCUX
    origin_y = models.DecimalField(max_digits=7, decimal_places=4,
                                   validators=[MinValueValidator(-90), MaxValueValidator(90)],
                                   null=True, blank=True)  # OCUY
    ship = models.CharField(max_length=4, null=True, blank=True)
    hauls_duration = models.IntegerField(validators=[MinValueValidator(0)],
                                         null=True, blank=True)
    # ew = models.CharField(max_length=2, null=True, blank=True)
    # ns = models.CharField(max_length=2, null=True, blank=True)
    # area_sampled = models.CharField(max_length=2, null=True, blank=True)
    # unit_sample = models.IntegerField(null=True, blank=True)
    comment = models.CharField(max_length=1000, null=True, blank=True)

    # Override the clean method to add a validation involved with two fields:
    def clean(self):
        if self.start_date and self.end_date:
            if self.start_date > self.end_date:
                raise ValidationError({'dates': 'End date hast to be later than or equal to start date.'})

    # To call the clean method we must override the save method too:
    def save(self, *args, **kwargs):
        self.full_clean()
        return super(Survey, self).save(*args, **kwargs)
