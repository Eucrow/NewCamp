from django.core.validators import MinValueValidator
from decimal import Decimal
from django.db import models

# Create your models here.
class Trawl(models.Model):
    # ARTE: use the old camp ARTE field as name of the gear
    name = models.PositiveSmallIntegerField(null=False, unique=True)
    # TIPO gear type
    gear_type = models.CharField(max_length=4, null=False)
    # PUERTAS otter boards type
    otter_boards_type = models.CharField(max_length=50, null=False)
    # SU_PUERTA otter boards area in square meters
    otter_boards_area = models.DecimalField(max_digits=2, decimal_places=1, null=True,
                                            validators=[MinValueValidator(Decimal('0.01'))])
    # KG_PUERTA otter boards weight in kg
    otter_boards_weight = models.PositiveSmallIntegerField(null=True)
    # MT_BURLON groundgear length in meters
    groundgear_length  = models.DecimalField(max_digits=3, decimal_places=1, null=True)
    # KG_BURLON groundgear weight in kg
    groundgear_weight = models.PositiveSmallIntegerField(null=True)
    # MT_CORCHO headline length in meters
    headline_length = models.DecimalField(max_digits=3, decimal_places=1, null=True)
    # FL_CORCHO headline number of floats
    headline_floats_number = models.PositiveSmallIntegerField(null=True)
    # MT_ALAS wings length in meters
    wing_length = models.DecimalField(max_digits=3, decimal_places=1, null=True)
    # MA_VISERA square in number of meshes??
    square_meshes = models.PositiveSmallIntegerField(null=True)
    # MA_CIELO top panel in number of meshes??
    top_panel_meshes = models.PositiveSmallIntegerField(null=True)
    # MA_VIENTRE bottom panel in number of meshes??
    bottom_panel_meshes = models.PositiveSmallIntegerField(null=True)
    # MA_COPO codend in number of meshes
    codend_meshes = models.PositiveSmallIntegerField(null=True)
    # MA_SOBREC inner liner (sobrecopo) in number of meshes
    inner_linner_meshes = models.PositiveSmallIntegerField(null=True)
    # DISTA_P door distance in meters
    otter_boards_distance = models.PositiveSmallIntegerField(null=True)
    # ABERT_H in meters
    horizontal_aperture = models.DecimalField(max_digits=3, decimal_places=1, null=True)
    # ABERT_V in meters
    vertical_aperture = models.DecimalField(max_digits=3, decimal_places=1, null=True)
    # OBSERV
    comment = models.CharField(max_length=500, null=True)

    def __unicode__(self):
        return self.name
