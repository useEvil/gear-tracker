import gpxpy as mod_gpxpy

from django.db.models import F

from geartracker.models import Activity


def save_gpx_info(user, gpx_file_io):
    """
    Get GPX info and save to Activity object.
    """

    bike = user.bike_created_by.get(default=True)
    gpx = mod_gpxpy.parse(gpx_file_io)
    title = gpx.name or 'Your Activity'
    try:
        title = gpx.tracks[0].name
    except:
        pass

    uphill, downhill = gpx.get_uphill_downhill()
    start_time, end_time = gpx.get_time_bounds()

    activity = Activity(
        bike=bike,
        title=title,
        description=gpx.description,
        distance=round(gpx.length_3d() / 1000),
        elevation=round(uphill),
        date_created=start_time,
        created_by = user,
        modified_by = user
    )

    bike.distance += activity.distance.get_num()
    bike.elevation += activity.elevation.get_num()
    bike.gear.update(elevation=F('elevation')+activity.elevation.get_num(), distance=F('distance')+activity.distance.get_num())
    bike.save()

    activity.save()
    return activity
