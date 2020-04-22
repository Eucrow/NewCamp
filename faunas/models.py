from django.db import models


class Fauna(models.Model):
    survey = models.ForeignKey('surveys.Survey', on_delete=models.CASCADE,)
    station = models.ForeignKey('stations.Station', on_delete=models.CASCADE,)
    haul = models.ForeignKey('hauls.Haul', on_delete=models.CASCADE,)
    specie = models.ForeignKey('species.Sp', on_delete=models.CASCADE,)
    weight = models.IntegerField(null=True, blank=True)
    number = models.IntegerField(null=True, blank=True)

    class Meta:
        unique_together = ('survey', 'station', 'haul', 'specie',)

