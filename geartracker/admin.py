import pytz

from django.contrib import admin
from django.conf import settings


from geartracker.models import Bike, Gear, Activity


class GearAdmin(admin.ModelAdmin):

    list_display = ('id','type','name','brand','model','distance','elevation','date_installed','date_removed')
    list_editable = ('type','name','date_installed','date_removed')
    exclude = ('created_by','created_date','modified_by','modified_date')
    search_fields = ('name','brand','model')
    save_on_top = True


class GearAdminInline(admin.TabularInline):
    model = Gear
    extra = 0
    exclude = ('created_by','created_date','modified_by','modified_date')


class ActivityAdmin(admin.ModelAdmin):

    list_display = ('id','title','description','distance','elevation','processed')
    list_editable = ('title','processed')
    exclude = ('created_by','created_date','modified_by','modified_date')
    search_fields = ('title','description')
    save_on_top = True


class ActivityAdminInline(admin.TabularInline):
    model = Activity
    extra = 0


class BikeAdmin(admin.ModelAdmin):

    list_display = ('id','name','brand','model','distance','elevation')
    list_editable = ('name',)
    exclude = ('created_by','created_date','modified_by','modified_date')
    search_fields = ('name','brand','model')
    save_on_top = True
    inlines = [GearAdminInline, ActivityAdminInline]


admin.site.register(Bike, BikeAdmin)
admin.site.register(Gear, GearAdmin)
admin.site.register(Activity, ActivityAdmin)
