import logging

from django.conf import settings
from rest_framework.decorators import list_route, detail_route
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response

from geartracker.models import Activity
from geartracker.api.activity_serializers import ActivitySerializer


logger = logging.getLogger('django')


class ActivityViewSet(ModelViewSet):

    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

    def retrieve(self, request, id, *args, **kwargs):
        """
        Retrieve activity
        """
        return super(ActivityViewSet, self).retrieve(request, id, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        """
        List all activities
        """
        return super(ActivityViewSet, self).list(request, *args, **kwargs)

    def update(self, request, id, *args, **kwargs):
        """
        Update activity information
        """
        return super(ActivityViewSet, self).update(request, id, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        Create a new activity
        """
        return super(ActivityViewSet, self).create(request, *args, **kwargs)

