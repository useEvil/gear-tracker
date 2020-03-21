from decimal import Decimal
from django.db.models import F
from stravalib.exc import ObjectNotFound

from geartracker.lib.strava import StravaAPI
from geartracker.models import Activity


def consume_strava_info(user, activity_id=None):
    """
    Get Strava info and save to Activity object.
    """
    api_tokens = user.apiaccesstokens_created_by.first()
    strava = StravaAPI(access_token=api_tokens.access_token)
    bike = user.bike_created_by.filter(default=True).get()

    try:
        latest = strava.get_activity(activity_id)
    except ObjectNotFound as err:
        raise(err)

    activity = Activity(
        activity_id=activity_id,
        bike=bike,
        title=latest.name,
        description=latest.description,
        distance=latest.distance.get_num(),
        elevation=latest.total_elevation_gain.get_num(),
        date_created=latest.start_date,
        created_by = user,
        modified_by = user
    )
    activity.save()

    bike.distance += Decimal(activity.distance)
    bike.elevation += Decimal(activity.elevation)
    bike.gear_id = latest.gear_id
    bike.gear.update(elevation=F('elevation')+activity.elevation, distance=F('distance')+activity.distance)
    bike.save()

    return activity
