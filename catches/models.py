from django.db import models


class Catch(models.Model):
    haul = models.ForeignKey('hauls.Haul', on_delete=models.CASCADE,)
    specie = models.ForeignKey('species.Sp', on_delete=models.CASCADE,)
    weight = models.IntegerField()
    category = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = ('haul', 'specie', 'category')

# class Category(models.Model):
#
#     sp = models.ForeignKey('species.Sp', on_delete=models.CASCADE, related_name='species_category')
#     category_name = models.CharField(max_length=50)
#
#     class Meta:
#         unique_together = ('sp', 'category_name')