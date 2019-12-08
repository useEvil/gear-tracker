import logging

from django.conf import settings
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication

from geartracker.models import Activity
from geartracker.api.activity_serializers import ActivitySerializer


logger = logging.getLogger('django')


class ActivityViewSet(ModelViewSet):

    serializer_class = ActivitySerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, pk, *args, **kwargs):
        """
        Retrieve activity
        """
        return super(ActivityViewSet, self).retrieve(request, pk, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        """
        List all activities
        """
        return super(ActivityViewSet, self).list(request, *args, **kwargs)

    def update(self, request, pk, *args, **kwargs):
        """
        Update activity information
        """
        return super(ActivityViewSet, self).update(request, pk, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        Create a new activity
        """
        return super(ActivityViewSet, self).create(request, *args, **kwargs)

    def get_queryset(self):
        """
        This view should return a list of all the activities
        for the currently authenticated user.
        """
        bike = self.request.query_params.get('bike', None)
        if bike:
            return Activity.objects.filter(bike__id=bike)
        else:
            return Activity.objects.filter(created_by=self.request.user)
