from django.db import models


class Survey(models.Model):
    stratification = models.ForeignKey('stratifications.Stratification', on_delete=models.PROTECT,)
    acronym = models.CharField(unique=True, max_length=3, null=True, blank=True)  # CLAV
    description = models.CharField(max_length=50, null=True, blank=True)  # IDENT
    start_date = models.DateField(null=True, blank=True) #COMI
    end_date = models.DateField(null=True, blank=True) #FINA
    width_x = models.IntegerField(null=True, blank=True)  # CUX
    width_y = models.IntegerField(null=True, blank=True)  # CUY
    origin_x = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)  # OCUX
    origin_y = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)  # OCUY
    ship = models.CharField(max_length=3, null=True, blank=True)
    hauls_duration = models.IntegerField(null=True, blank=True)
    # ew = models.CharField(max_length=2, null=True, blank=True)
    # ns = models.CharField(max_length=2, null=True, blank=True)
    # area_sampled = models.CharField(max_length=2, null=True, blank=True)
    unit_sample = models.IntegerField(null=True, blank=True)
    comment = models.CharField(max_length=1000, null=True, blank=True)
