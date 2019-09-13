#!/usr/bin/env python

"""
Command line utility to extract basic statistics from gpx file(s)
"""
import sys as mod_sys
import math as mod_math
import logging as mod_logging
import argparse as mod_argparse

from optparse import make_option
from django.core.management.base import BaseCommand, CommandError
from django.conf import settings

from geartracker.models import Gear, Bike, Activity
from geartracker.lib.tasks.run_parser import task_gpx_parse

KM_TO_MILES = 0.621371
M_TO_FEET = 3.28084


class Command(BaseCommand):
    args = '<podcast_date ...>'
    help = 'Post Podcast to Twitter and WordPress'

    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)

        self.url = ''
        self.func = None
        self.status = 'draft'

    option_list = BaseCommand.option_list + (
        make_option('--seconds', action='store_true', dest='seconds', default=False, help='print times as N seconds, rather than HH:MM:SS'),
        make_option('--miles', action='store_true', dest='miles', default=None, help='print distances and speeds using miles and feet'),
        make_option('--debug', action='store_true', dest='debug', default=None, help='show detailed logging'),
        make_option('--do_dry_run', action='store', dest='do_dry_run', default=False, help='Do Dry Run'),
        make_option('--strava', action='store', dest='strava', default=False, help='Use Strava API'),
    )

    def handle(self, *args, **options):

        for key in ['secods', 'miles', 'debug', 'do_dry_run']:
            setattr(self, key, options.get(key))

        for gpx_file in args:
            print('File: %s' % gpx_file)
            try:
                with open(gpx_file) as gpx_file_io:
                    gpx = task_gpx_parse.delay(args, gpx_file_io)
            except Exception as err:
                raise CommandError('Failure: {0}'.format(err))


    def print_gpx_part_info(gpx_part, indentation='    ', activity=None):
        """
        gpx_part may be a track or segment.
        """
        length_2d = gpx_part.length_2d()
        length_3d = gpx_part.length_3d()
        print('%sLength 2D: %s' % (indentation, format_long_length(length_2d)))
        print('%sLength 3D: %s' % (indentation, format_long_length(length_3d)))

        moving_time, stopped_time, moving_distance, stopped_distance, max_speed = gpx_part.get_moving_data()
        print('%sMoving time: %s' % (indentation, format_time(moving_time)))
        print('%sStopped time: %s' % (indentation, format_time(stopped_time)))
        #print('%sStopped distance: %s' % (indentation, format_short_length(stopped_distance)))
        print('%sMax speed: %s' % (indentation, format_speed(max_speed)))
        print('%sAvg speed: %s' % (indentation, format_speed(moving_distance / moving_time) if moving_time > 0 else "?"))

        uphill, downhill = gpx_part.get_uphill_downhill()
        print('%sTotal uphill: %s' % (indentation, format_short_length(uphill)))
        print('%sTotal downhill: %s' % (indentation, format_short_length(downhill)))

        start_time, end_time = gpx_part.get_time_bounds()
        print('%sStarted: %s' % (indentation, start_time))
        print('%sEnded: %s' % (indentation, end_time))

        if activity:
            activity.moving_time = moving_time
            activity.stopped_time = stopped_time
            activity.moving_distance = moving_distance
            activity.stopped_distance = stopped_distance
            activity.max_speed = max_speed

        points_no = len(list(gpx_part.walk(only_points=True)))
        print('%sPoints: %s' % (indentation, points_no))

        if points_no > 0:
            distances = []
            previous_point = None
            for point in gpx_part.walk(only_points=True):
                if previous_point:
                    distance = point.distance_2d(previous_point)
                    distances.append(distance)
                previous_point = point
            print('%sAvg distance between points: %s' % (indentation, format_short_length(sum(distances) / len(list(gpx_part.walk())))))

        print('')


    def print_gpx_info(gpx):
        activity = Activity()

        if gpx.name:
            print('  GPX name: %s' % gpx.name)
            activity.title = gpx.name
        if gpx.description:
            print('  GPX description: %s' % gpx.description)
            activity.title = gpx.name
        if gpx.author_name:
            print('  Author: %s' % gpx.author_name)
            activity.created_by = gpx.author_name
            activity.modified_by = gpx.author_name
        if gpx.author_email:
            print('  Email: %s' % gpx.author_email)

        print_gpx_part_info(gpx, activity=activity)

        for track_no, track in enumerate(gpx.tracks):
            for segment_no, segment in enumerate(track.segments):
                print('    Track #%s, Segment #%s' % (track_no, segment_no))
                print_gpx_part_info(segment, indentation='        ', activity=activity)
