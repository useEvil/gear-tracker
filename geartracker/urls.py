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


    url(r'^$', auth_views.LoginView.as_view(template_name='index.html'), name='home'),
    url(r'^dashboard/$', geartracker.views.home, name='dashboard'),
    url(r'^login/$', login, name='login'),
    url(r'^logout/$', logout, name='logout'),
    url(r'^oauth/', include('social_django.urls', namespace='social')),

    # strava API OAUTH
    url(r'^strava/api/authorization', geartracker.views.strava_authorization, name='strava_authorization'),
    url(r'^strava/api/authorized', geartracker.views.strava_authorized, name='strava_authorized'),
    url(r'^strava/api/consume/(?P<user_id>[-\w]+)/(?P<activity_id>[-\w]+)$', geartracker.views.strava_consume_activity, name='consume'),

    url(r'^upload/$', geartracker.views.upload, name='upload'),
]
