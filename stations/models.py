from django.db import models

from surveys.models import Survey
from samplers.models import Sampler


class Station(models.Model):
    survey = models.ForeignKey('surveys.Survey', on_delete=models.CASCADE, )
    station = models.SmallIntegerField()
    comment = models.CharField(max_length=1000, null=True, blank=True)

    class Meta:
        unique_together = ('survey', 'station', )
        # 'haul' is not consider inside the unique_together because a station can have multiple
        # trawl hauls, for example one valid and other one invalid.

    def __str__(self):
        return 'station: %s comment: %s' % (self.station, self.comment)
