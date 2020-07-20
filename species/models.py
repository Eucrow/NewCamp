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
    l_infinity = models.IntegerField(null=True, blank=True)
    k = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    t_zero = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    unit = models.IntegerField(null=True, blank=True)
    increment = models.IntegerField(null=True, blank=True)
    trophic_group = models.IntegerField(null=True, blank=True)
    APHIA = models.IntegerField(null=True, blank=True)
    comment = models.CharField(max_length=1000, null=True, blank=True)

    class Meta:
        # unique_together = ('group', 'sp_code',)
        constraints = [
            UniqueConstraint(fields=['group', 'sp_code'], name='unique_field')
        ]
    def __unicode__(self):
        return self.sp_name


class Category(models.Model):

    sp = models.ForeignKey('species.Sp', on_delete=models.CASCADE, related_name='species_category')
    category_name = models.CharField(max_length=50)

    class Meta:
        unique_together = ('sp', 'category_name')
