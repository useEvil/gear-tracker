from django.contrib.auth.models import User
from celery import shared_task
from celery.utils.log import get_task_logger

from geartracker.lib.parsers.gpx import save_gpx_info
from geartracker.lib.parsers.strava import consume_strava_info
from geartracker.lib.strava import StravaAPI

logger = get_task_logger(__name__)


@shared_task(name='geartracker.lib.tasks.task_parse_gpx', ignore_result=True)
def task_parse_gpx(user_id, gpx_file):
    logger.info('Parser: started for user {} gpx file {}'.format(user_id, gpx_file))

    user = User.objects.get(id=user_id)
    with open(gpx_file) as gpx_file_io:
        activity = save_gpx_info(user, gpx_file_io)

    return True

@shared_task(name='geartracker.lib.tasks.task_consume_strava', ignore_result=True)
def task_consume_strava(user_id, athlete_id=None, activity_id=None):
    logger.info('Consumer: started for user {} athlete_id {} activity_id {}'.format(user_id, athlete_id, activity_id))

    user = User.objects.get(id=user_id)
    api_tokens = user.apiaccesstokens_created_by.first()

    if athlete_id is None and activity_id is None:
        latest = user.activity_created_by.latest('id')
        logger.debug("==== task_consume_strava.latest [{0}]".format(latest))
        strava = StravaAPI(access_token=api_tokens.access_token)
        activities = strava.get_activities(after=latest.created_by, limit=10)
        for activity in activities:
            logger.debug("==== task_consume_strava.activity.id [{0}]".format(activity.id))
            result = consume_strava_info(user, athlete_id=athlete_id, activity_id=activity.id)
    else:
        result = consume_strava_info(user, athlete_id=athlete_id, activity_id=activity_id)

    return True
