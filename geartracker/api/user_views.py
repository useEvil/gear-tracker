import logging

from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from knox.auth import TokenAuthentication
from knox.models import AuthToken

from geartracker.api.user_serializers import UserSerializer, RegisterSerializer, LoginSerializer


logger = logging.getLogger('django')


class UserViewSet(ModelViewSet):

    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, pk, *args, **kwargs):
        """
        Retrieve User
        """
        return super(UserViewSet, self).retrieve(request, pk, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        """
        List all activities
        """
        return super(UserViewSet, self).list(request, *args, **kwargs)

    def update(self, request, pk, *args, **kwargs):
        """
        Update User information
        """
        return super(UserViewSet, self).update(request, pk, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        Create a new User
        """
        return super(UserViewSet, self).create(request, *args, **kwargs)

    def get_queryset(self):
        """
        This view should return a list of all the bikes
        for the currently authenticated user.
        """
        return [self.request.user]

    def get_object(self):
        """
        This view should return the user object
        for the currently authenticated user.
        """
        return self.request.user


class RegisterAPIView(GenericAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    authentication_classes = ()
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


class LoginAPIView(GenericAPIView):

    queryset = User.objects.all()
    serializer_class = LoginSerializer
    authentication_classes = ()
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        if user and user.is_active:
            login(request, user)
            _, token = AuthToken.objects.create(user)
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": token
            })
        else:
            error = {
                "field_errors": [
                    "Authentication Error"
                ]
            }
            return Response(error, status=status.HTTP_400_BAD_REQUEST)
