from celery import current_task, shared_task
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)


@shared_task(ignore_result=False, serializer='json')
def task_gpx_parse(args, gpx_file):
    logger.info('Parser: started for user {} activity {}'.format(user_id, gpx_activity_id))

    gpx = mod_gpxpy.parse(gpx_file)
    print_gpx_info(gpx, gpx_file)


    user = Users.objects.get(user_id)
    gpx(user, gpx_activity_id)

    return file_data
