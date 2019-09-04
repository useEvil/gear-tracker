import datetime as date

from django.db import models
from django.contrib.sites.models import Site

from geartracker.mixins.models import ModifiedDate

class Bike(ModifiedDate):

    name = models.CharField(max_length=100, blank=True, null=True)
    brand = models.CharField(max_length=100, blank=True, null=True)
    model = models.CharField(max_length=100, blank=True, null=True)
    default = models.BooleanField(default=False)
    distance = models.IntegerField(default=0)
    elevation = models.IntegerField(default=0)

    def __unicode__(self):
        return "{0} ({1})".format(self.name, self.model)

    def __str__(self):
        return "{0} ({1})".format(self.name, self.model)


class Gear(ModifiedDate):

    GEAR_TYPES = (
        ('frame', 'Frame'),
        ('front-wheel-hub', 'Front Wheel Hub'),
        ('rear-wheel-hub', 'Rear Wheel Hub'),
        ('front-wheel-rim', 'Front Wheel Rim'),
        ('rear-wheel-rim', 'Rear Wheel Rim'),
        ('chain', 'Chain'),
        ('fork', 'Fork'),
        ('handlebar', 'Handlebar'),
        ('pedals', 'Pedals'),
        ('front-tire', 'Front Tire'),
        ('reat-tire', 'Rear Tire'),
        ('bottom-bracket', 'Bottom Bracket'),
        ('front-brake', 'Front Brake'),
        ('rear-brake', 'Rear Brake'),
        ('front-brake-pads', 'Front Brake Pads'),
        ('rear-brake-pads', 'Rear Brake Pads'),
        ('front-brake-rotor', 'Front Brake Rotor'),
        ('rear-brake-rotor', 'Rear Brake Rotor'),
        ('front-brake-cable', 'Front Brake Cable'),
        ('rear-brake-cable', 'Rear Brake Cable'),
        ('front-brake-housing', 'Front Brake Housing'),
        ('rear-brake-housing', 'Rear Brake Housing'),
        ('front-brake-lever', 'Front Brake Lever'),
        ('rear-brake-lever', 'Rear Brake Lever'),
        ('cassette', 'Cassette'),
        ('chainring', 'Chainring'),
        ('crankset', 'Crankset'),
        ('rear-derailleur', 'Rear Derailleur'),
        ('front-derailleur', 'Front Derailleur'),
        ('headset', 'Headset'),
        ('saddle', 'Saddle'),
        ('seatpost', 'Seatpost'),
        ('stem', 'Stem'),
        ('shock', 'Rear Shock'),
        ('grips', 'Grips'),
        ('pivot-bearings', 'Pivot Bearings'),
        ('front-shifter', 'Front Shifter'),
        ('rear-shifter', 'Rear Shifter'),
        ('front-shifter-cable', 'Front Shifter Cable'),
        ('rear-shifter-cable', 'Rear Shifter Cable')
    )

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50, choices=GEAR_TYPES)
    brand = models.CharField(max_length=100, blank=True, null=True)
    model = models.CharField(max_length=100, blank=True, null=True)
    distance = models.IntegerField(default=0)
    elevation = models.IntegerField(default=0)
    date_installed = models.DateField()
    date_removed = models.DateField(blank=True, null=True)
    bike = models.ForeignKey(Bike, related_name='gear', null=True, on_delete=models.SET_NULL)

    class Meta:
        verbose_name_plural = 'Gear'

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

    class Meta:
        verbose_name_plural = 'Activities'

    def __unicode__(self):
        return "{0}: {1}".format(self.title, self.bike)

