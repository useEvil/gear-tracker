import logging

from django.conf import settings
from rest_framework.decorators import list_route, detail_route
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.response import Response

from geartracker.models import User
from geartracker.api.user_serializers import UserSerializer


logger = logging.getLogger('django')


class UserViewSet(ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def retrieve(self, request, id, *args, **kwargs):
        """
        Retrieve User
        """
        return super(UserViewSet, self).retrieve(request, id, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        """
        List all activities
        """
        return super(UserViewSet, self).list(request, *args, **kwargs)

    def update(self, request, id, *args, **kwargs):
        """
        Update User information
        """
        return super(UserViewSet, self).update(request, id, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        Create a new User
        """
        return super(UserViewSet, self).create(request, *args, **kwargs)

