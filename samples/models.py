from django.core.exceptions import ValidationError
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

    def clean(self):
        # to avoid circular imports, the import of notMeasuredIndividual model is done here
        from not_measured_individuals.models import notMeasuredIndividual
        # only lengths are allowed to be created if no individuals exist
        if self.number_individuals is not None:
            if notMeasuredIndividual.objects.filter(catch=self.catch).exists():
                raise ValidationError('Individuals already exist for this catch. It is not possible to add lengths if'
                                      'already exists number of individuals in the category.')

    def __str__(self):
        return '%d: %d' % (self.length, self.number_individuals)
