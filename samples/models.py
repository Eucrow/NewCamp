from django.db import models

class SampledWeight(models.Model):
    catch = models.ForeignKey('catches.Catch', on_delete=models.CASCADE, related_name='samples')
    # category = models.ForeignKey('species.Category', on_delete=models.CASCADE,)
    sampled_weight = models.IntegerField()


class Sex(models.Model):
    catch = models.ForeignKey('catches.Catch', on_delete=models.CASCADE, related_name='lengths')
    sex = models.IntegerField()


class Length(models.Model):
    # catch = models.ForeignKey('catches.Catch', on_delete=models.CASCADE, related_name='lengths')
    # sex = models.IntegerField()
    sex = models.ForeignKey('samples.Sex', on_delete=models.CASCADE, related_name='sexes')
    length = models.IntegerField()
    number_individuals = models.IntegerField()

    class Meta:
        unique_together = ('sex', 'length',)


