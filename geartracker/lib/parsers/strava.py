from django.contrib.auth.models import User

from geartracker.lib.strava import StravaAPI


def consume_strava_info(user_id, activity_id):
    """
    Get Strava info and save to Activity object.
    """
    strava_api = StravaAPI()
    user = User.objects.get(id=user_id)
    gpx = strava_api.get_latest_activity()

    activity = Activity(
        bike=user.bike_created_by.get(default=True),
        title=gpx.name,
        description=gpx.description,
        distance=gpx.length_3d() / 1000,
        elevation=uphill,
        date_created=start_time,
        created_by = user,
        modified_by = user
    )

    activity.save()
    return activity
