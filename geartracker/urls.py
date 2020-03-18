"""data-ingester URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
import geartracker.views

from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth import views as auth_views
from django.conf import settings

from geartracker.api import urls as api_v1

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(api_v1)),
    url(r'^api-auth/', include('rest_framework.urls')),

    url(r'^$', geartracker.views.home, name='home'),
    url(r'^dashboard/$', geartracker.views.dashboard, name='dashboard'),
    url(r'^oauth/', include('social_django.urls', namespace='social')),

    # strava API OAUTH
    url(r'^strava/api/authorization$', geartracker.views.strava_authorization, name='strava_authorization'),
    url(r'^strava/api/authorized$', geartracker.views.strava_authorized, name='strava_authorized'),
    url(r'^strava/api/subscribe$', geartracker.views.strava_subscribe, name='strava_subscribe'),
    url(r'^strava/api/subscribed$', geartracker.views.strava_subscribed, name='strava_subscribed'),
    url(r'^strava/api/subscriptions$', geartracker.views.strava_subscriptions, name='strava_subscriptions'),
    url(r'^strava/api/consume/(?P<user_id>[-\d]+)$', geartracker.views.strava_consume, name='strava_consume'),
    url(r'^strava/api/delete/all$', geartracker.views.strava_delete_subscriptions, name='strava_delete_all'),
    url(r'^strava/api/delete/(?P<subscription_id>[-\d]+)$', geartracker.views.strava_delete_subscription, name='strava_delete'),
    url(r'^strava/api/activities/all$', geartracker.views.strava_activities, name='strava_activities_all'),
    url(r'^strava/api/activity/(?P<activity_id>[-\d]+)$', geartracker.views.strava_activity, name='strava_activity'),

    url(r'^upload/$', geartracker.views.upload, name='upload'),
    url(r'^service/$', geartracker.views.service, name='service'),
]
