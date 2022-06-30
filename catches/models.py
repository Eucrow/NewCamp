from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Catch(models.Model):
    haul = models.ForeignKey('hauls.Haul', on_delete=models.CASCADE, )
    sp = models.ForeignKey('species.Sp', on_delete=models.CASCADE, )
    weight = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(99999999)])
    category = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(2)])

    class Meta:
        unique_together = ('haul', 'sp', 'category')

# class Category(models.Model):
#
#     sp = models.ForeignKey('species.Sp', on_delete=models.CASCADE, related_name='species_category')
#     category_name = models.CharField(max_length=50)
#
#     class Meta:
#         unique_together = ('sp', 'category_name')
