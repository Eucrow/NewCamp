from django.db import models

class SampledWeight(models.Model):
    catch = models.ForeignKey('catches.Catch', on_delete=models.CASCADE, related_name='samples')
    # category = models.ForeignKey('species.Category', on_delete=models.CASCADE,)
    sampled_weight = models.IntegerField()

    def __str__(self):
        return '%d: %d' % (self.catch.id, self.sampled_weight)


class Sex(models.Model):
    catch = models.ForeignKey('catches.Catch', on_delete=models.CASCADE, related_name='sexes')
    sex = models.IntegerField()


class Length(models.Model):
    sex = models.ForeignKey('samples.Sex', on_delete=models.CASCADE, related_name='lengths')
    length = models.IntegerField()
    number_individuals = models.IntegerField()

    class Meta:
        unique_together = ('sex', 'length')


