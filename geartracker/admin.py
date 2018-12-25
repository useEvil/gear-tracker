import pytz

from django.contrib import admin
from django.conf import settings


from geartracker.models import Bike, Gear, Activity


class BikeAdmin(admin.ModelAdmin):

    list_display = ('id','name','distance','elevation')
    list_editable = ('name',)
    exclude = ('created_by','created_date','modified_by','modified_date')
    search_fields = ('name','brand','model')
    save_on_top = True


class GearAdmin(admin.ModelAdmin):

    list_display = ('id','name','distance','elevation','date_installed')
    list_editable = ('name','date_installed')
    exclude = ('created_by','created_date','modified_by','modified_date')
    search_fields = ('name','brand','model')
    save_on_top = True


class ActivityAdmin(admin.ModelAdmin):

    list_display = ('id','description','distance','elevation','processed')
    list_editable = ('name','processed')
    exclude = ('created_by','created_date','modified_by','modified_date')
    search_fields = ('title','description')
    save_on_top = True


admin.site.register(Bike, BikeAdmin)
admin.site.register(Gear, GearAdmin)
admin.site.register(Activity, ActivityAdmin)
