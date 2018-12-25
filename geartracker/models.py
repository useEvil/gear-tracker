import datetime as date

from django.db import models
from django.contrib.sites.models import Site

from mixins.models import ModifiedDate


class Bike(ModifiedDate):

    name = models.CharField(max_length=100, blank=True, null=True)
    brand = models.CharField(max_length=100, blank=True, null=True)
    model = models.CharField(max_length=100, blank=True, null=True)
    distance = models.Integer()
    elevation = models.Integer()

    def __unicode__(self):
        return "{0} ({1})".format(self.name, self.model)


class Gear(ModifiedDate):

    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100, blank=True, null=True)
    model = models.CharField(max_length=100, blank=True, null=True)
    distance = models.Integer()
    elevation = models.Integer()
    date_installed = models.DateTime()
    date_replaced = models.DateTime()
    bike = models.ForeignKey(Bike, releated_name='gear')

    def __unicode__(self):
        return "{0} ({1})".format(self.name, self.model)


class Activity(ModifiedDate):

    title = models.CharField(max_length=100)
    description = models.TextField(max_length=6500, blank=True, null=True)
    distance = models.Integer()
    elevation = models.Integer()
    processed = models.Boolean()
    date_created = models.DateTime()
    bike = models.ForeignKey(Bike, releated_name='activities')

    def __unicode__(self):
        return "{0} ({1})".format(self.name, self.site)

