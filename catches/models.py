from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models import UniqueConstraint

from samples.models import Sex, Length


class Catch(models.Model):
    haul = models.ForeignKey('hauls.Haul', on_delete=models.CASCADE, )
    sp = models.ForeignKey('species.Sp', on_delete=models.CASCADE, )
    category = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(99)])
    weight = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(99999999)])
    not_measured_individuals = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(9999)], blank=True, null=True)

    class Meta:
        constraints = [
            UniqueConstraint(fields=['haul', 'sp', 'category'], name='unique_catch')
        ]

    def save(self, *args, **kwargs):
        # only individuals are allowed to be created if no lengths exist
        sex_instances = Sex.objects.filter(catch=self.catch)

        if Length.objects.filter(sex__in=sex_instances, number_individuals__isnull=False).exists():
            raise ValidationError('Individuals already exist for this catch')
        super(Catch, self).save(*args, **kwargs)

# class Category(models.Model):
#
#     sp = models.ForeignKey('species.Sp', on_delete=models.CASCADE, related_name='species_category')
#     category_name = models.CharField(max_length=50)
#
#     class Meta:
#         unique_together = ('sp', 'category_name')
