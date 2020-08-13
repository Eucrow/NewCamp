from django.db import models


class Catch(models.Model):
    haul = models.ForeignKey('hauls.Haul', on_delete=models.CASCADE,)
    # specie = models.ForeignKey('species.Sp', on_delete=models.CASCADE,)
    weight = models.IntegerField()
    category = models.ForeignKey('species.Category', on_delete=models.CASCADE,)

    class Meta:
        # unique_together = ('haul', 'specie', 'category')
        unique_together = ('haul', 'category')
