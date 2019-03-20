from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers
from rest_framework.documentation import include_docs_urls

# from geartracker.api.user_views import UserViewSet
from geartracker.api.bike_views import BikeViewSet
from geartracker.api.gear_views import GearViewSet
from geartracker.api.activity_views import ActivityViewSet

router = routers.SimpleRouter()
# router.register(r'user', UserViewSet)
router.register(r'bike', BikeViewSet)
router.register(r'gear', GearViewSet)
router.register(r'activity', ActivityViewSet)

urlpatterns = [
    url(r'^docs/', include_docs_urls(title='GearTracker API', description='GearTracker Browser')),
    url(r'^', include(router.urls)),
]
