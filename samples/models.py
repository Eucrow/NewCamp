from django.db import models


class Length(models.Model):
    catch = models.ForeignKey('catches.Catch', on_delete=models.CASCADE, related_name='lengths')
    sex = models.IntegerField()
    length = models.IntegerField()
    number_individuals = models.IntegerField()

    class Meta:
        unique_together = ('catch', 'sex', 'length',)


class SampledWeight(models.Model):
    catch = models.ForeignKey('catches.Catch', on_delete=models.CASCADE, related_name='samples')
    # category = models.ForeignKey('species.Category', on_delete=models.CASCADE,)
    sampled_weight = models.IntegerField()
