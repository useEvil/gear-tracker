import gpxpy as mod_gpxpy
import sys as mod_sys
import math as mod_math
import logging as mod_logging
import argparse as mod_argparse

from geartracker.models import Gear, Bike, Activity

KM_TO_MILES = 0.621371
M_TO_FEET = 3.28084


gpx_activity = save_gpx_info(gpx_file, user)

def save_gpx_info(gpx_file, user):
    """
    Get GPX info and save to Activity object.
    """
    gpx = gpxpy.parse(open(gpx_file))
    uphill, downhill = gpx.get_uphill_downhill()
    start_time, end_time = gpx.get_time_bounds()

    activity = Activity(
        bike=user.bike_created_by.get(default=True),
        title=gpx.name,
        description=gpx.description,
        distance=gpx.length_3d() / 1000,
        elevation=uphill,
        date_created=start_time
    )

    activity.save()
    return activity


def update_gear(activity):
    pass


def format_time(time_s):
    if not time_s:
        return 'n/a'
    elif args.seconds:
        return str(int(time_s))
    else:
        minutes = mod_math.floor(time_s / 60.)
        hours = mod_math.floor(minutes / 60.)
        return '%s:%s:%s' % (str(int(hours)).zfill(2), str(int(minutes % 60)).zfill(2), str(int(time_s % 60)).zfill(2))


def format_long_length(length):
    if args.miles:
        return '{:.3f}miles'.format(length / 1000. * KM_TO_MILES)
    else:
        return '{:.3f}km'.format(length / 1000.)


def format_short_length(length):
    if args.miles:
        return '{:.2f}ft'.format(length * M_TO_FEET)
    else:
        return '{:.2f}m'.format(length)


def format_speed(speed):
    if not speed:
        speed = 0
    if args.miles:
        return '{:.2f}mph'.format(speed * KM_TO_MILES * 3600. / 1000.)
    else:
        return '{:.2f}m/s = {:.2f}km/h'.format(speed, speed * 3600. / 1000.)

