from django.db import models


class Stratum (models.Model):
    # survey = models.ForeignKey('surveys.Survey', on_delete=models.CASCADE,)
    stratification = models.ForeignKey('stratifications.Stratification', on_delete=models.CASCADE,)
    stratum = models.CharField(max_length=50, null=True, blank=True)
    area = models.IntegerField(null=True, blank=True)
    comment = models.CharField(max_length=1000, null=True, blank=True)

    class Meta:
        unique_together = ('stratification', 'stratum',)

    def __str__(self):
        return '%s %s %s' % (self.stratum, self.area, self.comment)
