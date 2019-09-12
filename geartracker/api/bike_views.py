import logging

from django.conf import settings
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response

from geartracker.models import Bike
from geartracker.api.bike_serializers import BikeSerializer


logger = logging.getLogger('django')


class BikeViewSet(ModelViewSet):

    queryset = Bike.objects.all()
    serializer_class = BikeSerializer

    def retrieve(self, request, pk, *args, **kwargs):
        """
        Retrieve Bike
        """
        return super(BikeViewSet, self).retrieve(request, pk, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        """
        List all bikes
        """
        return super(BikeViewSet, self).list(request, *args, **kwargs)

    def update(self, request, pk, *args, **kwargs):
        """
        Update Bike information
        """
        return super(BikeViewSet, self).update(request, pk, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        Create a new Bike
        """
        return super(BikeViewSet, self).create(request, *args, **kwargs)
