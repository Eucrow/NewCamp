from django.db import models

from django.db.models import UniqueConstraint

from species.validators import group_validator


class Sp(models.Model):
    group = models.IntegerField(validators=[group_validator], null=True, blank=True)
    sp_code = models.IntegerField(null=True, blank=True)
    sp_name = models.CharField(max_length=50, null=True, blank=True)
    spanish_name = models.CharField(max_length=50, null=True, blank=True)
    a_param = models.DecimalField(max_digits=7, decimal_places=6, null=True, blank=True)
    b_param = models.DecimalField(max_digits=7, decimal_places=6, null=True, blank=True)
    unit = models.IntegerField(null=True, blank=True)
    increment = models.IntegerField(null=True, blank=True)
    APHIA = models.IntegerField(null=True, blank=True)

    class Meta:
        constraints = [
            UniqueConstraint(fields=['group', 'sp_code'], name='unique_field')
        ]

    def __unicode__(self):
        return self.sp_name
