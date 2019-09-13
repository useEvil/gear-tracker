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


