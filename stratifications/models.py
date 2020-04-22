from django.db import models


class Stratification(models.Model):
    survey = models.ForeignKey('surveys.Survey', on_delete=models.CASCADE,)
    stratification = models.CharField(max_length=50)
    comment = models.CharField(max_length=1000, null=True, blank=True)

    class Meta:
        unique_together = ('survey', 'stratification',)
