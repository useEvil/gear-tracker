from django.conf import settings
from django.urls import reverse

from stravalib.client import Client


class StravaAPI(object):

    client = None

    def __init__(self, *args, **kwargs):
        self.client = Client(access_token=kwargs.get('access_token'))

    def authorization_url(self):
        redirect_uri = "{host}{endpoint}".format(host=settings.WWW_HOST, endpoint=reverse('strava_authorized'))
        return self.client.authorization_url(client_id=settings.STRAVA_CLIENT_ID, redirect_uri=redirect_uri)

    def exchange_code_for_token(self, code):
        return self.client.exchange_code_for_token(
                client_id=settings.STRAVA_CLIENT_ID,
                client_secret=settings.STRAVA_CLIENT_SECRET,
                code=code
            )

    def refresh_access_token(self, refresh_token):
        return self.client.exchange_code_for_token(
                client_id=settings.STRAVA_CLIENT_ID,
                client_secret=settings.STRAVA_CLIENT_SECRET,
                refresh_token=refresh_token
            )

    def get_athlete(self):
        return self.client.get_athlete()

    def get_activities(self, limit=5):
        return self.client.get_activities(limit=limit)

    def push_subscription(self):
        callback_url = "{host}{endpoint}".format(host=settings.WWW_HOST, endpoint=reverse('strava_subscribed'))
        # strava no longer uses api.strava.com
        self.client.protocol.server_webhook_events = 'www.strava.com'
        return self.client.create_subscription(settings.STRAVA_CLIENT_ID, settings.STRAVA_CLIENT_SECRET, callback_url)
#         print("==== raw [{0}]".format(raw))
#         return self.client.handle_subscription_callback(raw)

    def handle_subscription(self, raw):
        # strava no longer uses api.strava.com
        self.client.protocol.server_webhook_events = 'www.strava.com'
        return self.client.handle_subscription_callback(raw)
