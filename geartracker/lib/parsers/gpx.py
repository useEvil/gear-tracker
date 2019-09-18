import gpxpy
from django.contrib.auth.models import User

from geartracker.models import Gear, Bike, Activity


def save_gpx_info(user_id, gpx_file):
    """
    Get GPX info and save to Activity object.
    """
    user = User.objects.get(id=user_id)
    gpx = gpxpy.parse(gpx_file)
    uphill, downhill = gpx.get_uphill_downhill()
    start_time, end_time = gpx.get_time_bounds()

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
