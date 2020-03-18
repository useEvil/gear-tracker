import logging

from django.conf import settings
from django.urls import reverse
from stravalib.client import Client

logger = logging.getLogger(__name__)

class StravaAPI(object):

    client = None

    def __init__(self, *args, **kwargs):
        self.client = Client(access_token=kwargs.get('access_token'))

        # strava no longer uses api.strava.com
        self.client.protocol.server_webhook_events = 'www.strava.com'

    def access_token(self, access_token=None):
        if access_token:
            self.client.access_token = access_token
        return self.client.access_token

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

    def get_gear(self, gear_id):
        return self.client.get_gear(gear_id)

    def get_activity(self, activity_id):
        return self.client.get_activity(activity_id)

    def get_activities(self, before=None, after=None, limit=5):
        return self.client.get_activities(before=before, after=after, limit=limit)

    def push_subscription(self, user):
        callback_url = "{host}{endpoint}".format(host=settings.WWW_HOST, endpoint=reverse('strava_consume', kwargs={'user_id': user.id}))
        try:
            return self.client.create_subscription(settings.STRAVA_CLIENT_ID, settings.STRAVA_CLIENT_SECRET, callback_url)
        except Exception as err:
            logger.error("==== err [{0}]".format(err))
            if 'already exists' in err.args[0]:
                api_tokens = user.apiaccesstokens_created_by.first()
                self.client.delete_subscription(api_tokens.subscription_id, settings.STRAVA_CLIENT_ID, settings.STRAVA_CLIENT_SECRET)
                return self.client.create_subscription(settings.STRAVA_CLIENT_ID, settings.STRAVA_CLIENT_SECRET, callback_url)

    def handle_subscription(self, query):
        raw = {
                'hub.challenge': query.get('hub.challenge'),
                'hub.mode': query.get('hub.mode'),
                'hub.verify_token': query.get('hub.verify_token')
            }
        return self.client.handle_subscription_callback(raw)

    def list_subscriptions(self):
        return self.client.list_subscriptions(settings.STRAVA_CLIENT_ID, settings.STRAVA_CLIENT_SECRET)

    def delete_subscription(self, subscription_id):
        self.client.delete_subscription(subscription_id, settings.STRAVA_CLIENT_ID, settings.STRAVA_CLIENT_SECRET)

    def delete_subscriptions(self):
        subscriptions = self.list_subscriptions()
        for raw in subscriptions:
            self.client.delete_subscription(raw.id, settings.STRAVA_CLIENT_ID, settings.STRAVA_CLIENT_SECRET)

    def list_activities(self, before=None, after=None, limit=10):
        return self.client.get_activities(before=before, after=after, limit=limit)

