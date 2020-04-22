from django.db import models


class Sampler (models.Model):
    sampler = models.CharField(max_length=100, unique=True)
    comment = models.CharField(max_length=1000, null=True, blank=True)
