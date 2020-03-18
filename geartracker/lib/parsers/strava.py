from django.db.models import F

from geartracker.lib.strava import StravaAPI
from geartracker.models import Activity


def consume_strava_info(user, activity_id=None):
    """
    Get Strava info and save to Activity object.
    """
    api_tokens = user.apiaccesstokens_created_by.first()
    strava = StravaAPI(access_token=api_tokens.access_token)
    latest = strava.get_activity(activity_id)
    bike = user.bike_created_by.filter(name__icontains=latest.gear.name, default=True).get()

    activity = Activity(
        bike=bike,
        title=latest.name,
        description=latest.description,
        distance=latest.distance,
        elevation=latest.total_elevation_gain,
        date_created=latest.start_date,
        created_by = user,
        modified_by = user
    )

    bike.distance += activity.distance.get_num()
    bike.elevation += activity.elevation.get_num()
    bike.gear.update(elevation=F('elevation')+activity.elevation.get_num(), distance=F('distance')+activity.distance.get_num())
    bike.save()

    activity.save()
    return activity
