from django.conf import settings

from stravalib.client import Client


class StravaAPI(object):

    client = Client()

    def strava_authorization_url(self):
        redirect_uri = "{host}/strava_authorized".format(host=settings.WWW_HOST)
        return self.client.authorization_url(client_id=settings.STRAVA_CLIENT_ID, redirect_uri=redirect_uri)

