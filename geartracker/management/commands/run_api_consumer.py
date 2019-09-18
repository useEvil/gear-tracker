#!/usr/bin/env python

"""
Command line utility to extract basic statistics from gpx file(s)
"""
from django.core.management.base import BaseCommand, CommandError

from geartracker.lib.tasks import task_consume_strava

KM_TO_MILES = 0.621371
M_TO_FEET = 3.28084


class Command(BaseCommand):
    help = 'Consumer Strava Activity'

    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)

    def add_arguments(self, parser):
        parser.add_argument('activity_id', nargs='+', type=int)
        parser.add_argument('--user_id', action='store', dest='user_id', default=None, help='User ID'),
        parser.add_argument('--seconds', action='store_true', dest='seconds', default=False, help='print times as N seconds, rather than HH:MM:SS'),
        parser.add_argument('--miles', action='store_true', dest='miles', default=None, help='print distances and speeds using miles and feet'),
        parser.add_argument('--debug', action='store_true', dest='debug', default=None, help='show detailed logging'),
        parser.add_argument('--do_dry_run', action='store_true', dest='do_dry_run', default=False, help='Do Dry Run'),


    def handle(self, *args, **options):

        for key in ['user_id', 'secods', 'miles', 'debug', 'do_dry_run']:
            setattr(self, key, options.get(key))

        for activity_id in options.get('activity_id'):
            try:
                if self.do_dry_run:
                    print("==== user [{0}]".format(self.user_id))
                    print("==== activity_id [{0}]".format(activity_id))
                else:
                    gpx = task_consume_strava.delay(self.user_id, activity_id=activity_id)
            except Exception as err:
                raise Exception('Failure: {0}'.format(err))
