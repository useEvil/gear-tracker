from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from knox import views as knox_views

from geartracker.api.user_views import RegisterAPIView, LoginAPIView
from geartracker.api.bike_views import BikeViewSet
from geartracker.api.gear_views import GearViewSet
from geartracker.api.activity_views import ActivityViewSet

router = routers.SimpleRouter()
router.register(r'bike', BikeViewSet, 'bike')
router.register(r'gear', GearViewSet, 'gear')
router.register(r'activity', ActivityViewSet, 'activity')
# router.register(r'consume', ConsumeViewSet, 'consume')

urlpatterns = [
    url(r'^docs/', include_docs_urls(title='GearTracker API', description='GearTracker Browser')),
    url(r'^', include(router.urls)),
    url(r'^login/$', LoginAPIView.as_view(), name='login'),
    url(r'^register/$', RegisterAPIView.as_view(), name='register'),
    url(r'^logout/$', knox_views.LogoutView.as_view(), name='logout'),
    url(r'^logoutall/$', knox_views.LogoutAllView.as_view(), name='logoutall'),
]
