#!/usr/bin/env python

"""
Command line utility to extract basic statistics from gpx file(s)
"""
import gpxpy as mod_gpxpy

from django.core.management.base import BaseCommand, CommandError

from geartracker.lib.tasks import task_parse_gpx
from geartracker.lib.utils import print_gpx_info, print_gpx_part_info

KM_TO_MILES = 0.621371
M_TO_FEET = 3.28084


class Command(BaseCommand):
    args = '<podcast_date ...>'
    help = 'Post Podcast to Twitter and WordPress'

    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)

    def add_arguments(self, parser):
        parser.add_argument('gpx_files', nargs='+', type=str)
        parser.add_argument('--user_id', action='store', dest='user_id', default=None, help='User ID'),
        parser.add_argument('--seconds', action='store_true', dest='seconds', default=False, help='print times as N seconds, rather than HH:MM:SS'),
        parser.add_argument('--miles', action='store_true', dest='miles', default=None, help='print distances and speeds using miles and feet'),
        parser.add_argument('--debug', action='store_true', dest='debug', default=None, help='show detailed logging'),
        parser.add_argument('--do_dry_run', action='store_true', dest='do_dry_run', default=False, help='Do Dry Run'),

    def handle(self, *args, **options):

        for key in ['user_id', 'secods', 'miles', 'debug', 'do_dry_run']:
            setattr(self, key, options.get(key))

        for gpx_file in options.get('gpx_files'):
            print("==== gpx_file [{0}]".format(gpx_file))
            try:
                print("==== self.do_dry_run [{0}]".format(self.do_dry_run))
                if self.do_dry_run:
                    with open(gpx_file) as gpx_file_io:
                        gpx = mod_gpxpy.parse(gpx_file_io)
                        print_gpx_info(gpx)
                else:
                    gpx = task_parse_gpx.delay(self.user_id, gpx_file)
            except Exception as err:
                raise CommandError('Failure: {0}'.format(err))
