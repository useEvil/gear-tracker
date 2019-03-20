import logging

from django.conf import settings
from rest_framework.decorators import list_route, detail_route
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response

from geartracker.models import Gear
from geartracker.api.gear_serializers import GearSerializer


logger = logging.getLogger('django')


class GearViewSet(ModelViewSet):

    queryset = Gear.objects.all()
    serializer_class = GearSerializer

    def retrieve(self, request, id, *args, **kwargs):
        """
        Retrieve Gear
        """
        return super(GearViewSet, self).retrieve(request, id, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        """
        List all activities
        """
        return super(GearViewSet, self).list(request, *args, **kwargs)

    def update(self, request, id, *args, **kwargs):
        """
        Update Gear information
        """
        return super(GearViewSet, self).update(request, id, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        Create a new Gear
        """
        return super(GearViewSet, self).create(request, *args, **kwargs)

