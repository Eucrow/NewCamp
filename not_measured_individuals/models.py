from django.db import models

from samples.models import Sex, Length

from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator

class notMeasuredIndividual(models.Model):
    catch = models.OneToOneField(
        'catches.Catch', on_delete=models.CASCADE, related_name='not_measured_individuals', unique=True)
    number_individuals = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(9999)])

    def save(self, *args, **kwargs):
        # only individuals are allowed to be created if no lengths exist
        sex_instances = Sex.objects.filter(catch=self.catch)

        if Length.objects.filter(sex__in=sex_instances, number_individuals__isnull=False).exists():
            raise ValidationError('Individuals already exist for this catch')
        super(notMeasuredIndividual, self).save(*args, **kwargs)