from django.db import models


class Stratum (models.Model):
    stratification = models.ForeignKey('stratifications.Stratification', on_delete=models.CASCADE, related_name='stratum')
    stratum = models.CharField(max_length=50, null=True, blank=True)
    area = models.IntegerField(null=True, blank=True)
    comment = models.CharField(max_length=1000, null=True, blank=True)

    class Meta:
        unique_together = ('stratification', 'stratum')

    def __str__(self):
        return '%s %s %s' % (self.stratum, self.area, self.comment)
