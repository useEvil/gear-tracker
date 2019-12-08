import logging, json

from django.conf import settings
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication

from geartracker.models import Gear
from geartracker.api.gear_serializers import GearSerializer


logger = logging.getLogger('django')


class GearViewSet(ModelViewSet):

    serializer_class = GearSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, pk, *args, **kwargs):
        """
        Retrieve Gear
        """
        return super(GearViewSet, self).retrieve(request, pk, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        """
        List all activities
        """
        return super(GearViewSet, self).list(request, *args, **kwargs)

    def update(self, request, pk, *args, **kwargs):
        """
        Update Gear information
        """
        return super(GearViewSet, self).update(request, pk, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        Create a new Gear
        """
        return super(GearViewSet, self).create(request, *args, **kwargs)

    def get_queryset(self):
        """
        This view should return a list of all the gear
        for the currently authenticated user.
        """
        bike = self.request.query_params.get('bike', None)
        if bike:
            return Gear.objects.filter(bike__id=bike)
        else:
            return Gear.objects.filter(created_by=self.request.user)

    @action(methods=['GET'], detail=False, url_path=None, url_name=None)
    def gear_types(self, request, *args, **kwargs):
        """
        Return list of gear types

        get:
        Return list of gear types
        """
        return Response(Gear().GEAR_TYPES)
