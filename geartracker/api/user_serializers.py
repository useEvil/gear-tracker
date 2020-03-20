from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import APIException

from geartracker.models import APIAccessTokens


class APIAccessTokensSerializer(serializers.ModelSerializer):

    class Meta:
        model = APIAccessTokens
        fields = ['access_token','subscription_id']


class UserSerializer(serializers.ModelSerializer):

    strava_connect = APIAccessTokensSerializer(read_only=True)

    class Meta:
        model = User
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        try:
            user = User.objects.create_user(
                validated_data['username'],
                validated_data['email'],
                validated_data['password']
            )
        except Exception as err:
            raise APIException(err)
        else:
            user.first_name = validated_data['first_name']
            user.first_name = validated_data['last_name']
            user.save()
        return user


class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
