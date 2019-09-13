from celery import current_task, shared_task
from celery.utils.log import get_task_logger

import lib.parsers.gpx as gpx
import lib.parsers.strava as strava

logger = get_task_logger(__name__)


@shared_task(ignore_result=False, serializer='json')
def task_gpx_parse(args, gpx_file):
    logger.info('Parser: started for user {} gpx file {}'.format(args.get('user_id'), gpx_file))

    gpx = mod_gpxpy.parse(gpx_file)
#     print_gpx_info(gpx, gpx_file)


    user = Users.objects.get(user_id)
    gpx(user, gpx_activity_id)

    return True

@shared_task(ignore_result=False, serializer='json')
def task_strava_parse(args, activity_id):
    logger.info('Parser: started for user {} activity {}'.format(args.get('user_id'), activity_id))

    user = Users.objects.get(args.get('user_id'))
    strava(user, activity_id)

    return True


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
