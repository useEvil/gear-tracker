from geartracker.lib.strava import StravaAPI


def consume_strava_info(user, activity_id):
    """
    Get Strava info and save to Activity object.
    """
    strava_api = StravaAPI()
    latest = strava_api.get_activity(activity_id)
    bike = user.bike_created_by.get(name__icontains=latest.gear.name)

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

    bike.distance += activity.distance
    bike.elevation += activity.elevation
    bike.gear.update(elevation=F('elevation')+activity.elevation, distance=F('distance')+activity.distance)
    bike.save()

    activity.save()
    return activity
