from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class SampledWeight(models.Model):
    # catch = models.ForeignKey('catches.Catch', on_delete=models.CASCADE, related_name='samples')
    # category = models.ForeignKey('species.Category', on_delete=models.CASCADE,)
    catch = models.OneToOneField(
        'catches.Catch', on_delete=models.CASCADE, related_name='samples')
    sampled_weight = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(99999999)])

    def __str__(self):
        return '%d: %d' % (self.catch.id, self.sampled_weight)


class Sex(models.Model):
    catch = models.ForeignKey(
        'catches.Catch', on_delete=models.CASCADE, related_name='sexes')
    sex = models.IntegerField(validators=[MinValueValidator(
        1), MaxValueValidator(3)], null=False, blank=False)

    class Meta:
        unique_together = ('sex', 'catch')


class Length(models.Model):
    sex = models.ForeignKey(
        'samples.Sex', on_delete=models.CASCADE, related_name='lengths')
    length = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(9999)])
    number_individuals = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(9999)])

    class Meta:
        unique_together = ('sex', 'length')

    def __str__(self):
        return '%d: %d' % (self.length, self.number_individuals)
