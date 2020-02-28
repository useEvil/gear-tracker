from django.contrib.auth.models import User
from celery import shared_task
from celery.utils.log import get_task_logger

from geartracker.lib.parsers.gpx import save_gpx_info
from geartracker.lib.parsers.strava import consume_strava_info

logger = get_task_logger(__name__)


@shared_task(name='geartracker.lib.tasks.task_parse_gpx', ignore_result=True)
def task_parse_gpx(user_id, gpx_file):
    logger.info('Parser: started for user {} gpx file {}'.format(user_id, gpx_file))

    user = User.objects.get(id=user_id)
    with open(gpx_file) as gpx_file_io:
        activity = save_gpx_info(user, gpx_file_io)

    return True

@shared_task(name='geartracker.lib.tasks.task_consume_strava', ignore_result=True)
def task_consume_strava(user_id, activity_id):
    logger.info('Consumer: started for user {} activity {}'.format(user_id, activity_id))

    user = User.objects.get(id=user_id)
    activity = consume_strava_info(user, activity_id)

    return True
