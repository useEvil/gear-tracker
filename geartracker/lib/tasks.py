import gpxpy as mod_gpxpy

from celery import current_task, shared_task
from celery.utils.log import get_task_logger

from geartracker.lib.parsers.gpx import save_gpx_info
from geartracker.lib.parsers.strava import consume_strava_info

logger = get_task_logger(__name__)


@shared_task(ignore_result=True)
def task_parse_gpx(user, gpx_file):
    logger.info('Parser: started for user {} gpx file {}'.format(user, gpx_file))

    with open(gpx_file) as gpx_file_io:
        gpx = mod_gpxpy.parse(gpx_file_io)
        activity = save_gpx_info(user_id, gpx)

    return True

@shared_task(ignore_result=True)
def task_consume_strava(user_id, activity_id):
    logger.info('Consumer: started for user {} activity {}'.format(user, activity_id))

    activity = consume_strava_info(user_id, activity_id)

    return True
