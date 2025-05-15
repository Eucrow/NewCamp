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

    def clean(self):
        if self.sampled_weight and self.catch.weight:
            if self.sampled_weight > self.catch.weight:
                raise ValidationError({
                    'sampled_weight': 'Sampled weight cannot be greater than catch weight.'
                })

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return '%d: %d' % (self.catch.id, self.sampled_weight)


class Sex(models.Model):
    catch = models.ForeignKey(
        'catches.Catch', on_delete=models.CASCADE, related_name='sexes')
    sex = models.IntegerField(validators=[MinValueValidator(
        1), MaxValueValidator(3)], null=False, blank=False)
    measurement_type = models.ForeignKey('species.MeasurementType', on_delete=models.CASCADE,
                                         related_name='measurement_type')

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
        from catches.models import Catch
        not_measured_individuals = Catch.objects.get(id=self.sex.catch_id).not_measured_individuals
        print(not_measured_individuals)
        if not_measured_individuals is not None:
            raise ValidationError('Individuals already exist for this catch. It is not possible to add lengths if '
                                  'already exists number of individuals in the category.')

    def __str__(self):
        return '%d: %d' % (self.length, self.number_individuals)
