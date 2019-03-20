from rest_framework import serializers

from geartracker.models import Gear


class GearSerializer(serializers.ModelSerializer):

    class Meta:
        model = Gear
        fields = '__all__'
