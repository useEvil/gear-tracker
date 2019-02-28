import datetime as date

from django.db import models
from django.contrib.sites.models import Site

from geartracker.mixins.models import ModifiedDate


class Bike(ModifiedDate):

    name = models.CharField(max_length=100, blank=True, null=True)
    brand = models.CharField(max_length=100, blank=True, null=True)
    model = models.CharField(max_length=100, blank=True, null=True)
    distance = models.IntegerField(default=0)
    elevation = models.IntegerField(default=0)

    def __unicode__(self):
        return "{0} ({1})".format(self.name, self.model)


class Gear(ModifiedDate):

    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100, blank=True, null=True)
    model = models.CharField(max_length=100, blank=True, null=True)
    distance = models.IntegerField(default=0)
    elevation = models.IntegerField(default=0)
    date_installed = models.DateTimeField()
    date_removed = models.DateTimeField(blank=True, null=True)
    bike = models.ForeignKey(Bike, related_name='gear', null=True, on_delete=models.SET_NULL)

    def __unicode__(self):
        return "{0} ({1})".format(self.name, self.model)


class Activity(ModifiedDate):

    title = models.CharField(max_length=100)
    description = models.TextField(max_length=6500, blank=True, null=True)
    distance = models.IntegerField(default=0)
    elevation = models.IntegerField(default=0)
    processed = models.BooleanField(default=False)
    date_created = models.DateTimeField()
    bike = models.ForeignKey(Bike, related_name='activities', null=True, on_delete=models.SET_NULL)

    def __unicode__(self):
        return "{0} ({1})".format(self.name, self.site)

