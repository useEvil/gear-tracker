import pytz

from django.contrib import admin
from django.conf import settings


from geartracker.models import Bike, Gear, Activity, APIAccessTokens


class GearAdmin(admin.ModelAdmin):

    list_display = ('id','type','name','brand','model','distance','elevation','date_installed','date_removed')
    list_editable = ('type','name','date_installed','date_removed')
    exclude = ('created_date','modified_by','modified_date')
    search_fields = ('name','brand','model')
    save_on_top = True


class GearAdminInline(admin.TabularInline):
    model = Gear
    extra = 0
    exclude = ('created_by','created_date','modified_by','modified_date')


class ActivityAdmin(admin.ModelAdmin):

    list_display = ('id','title','description','distance','elevation','processed')
    list_editable = ('title','processed')
    exclude = ('created_date','modified_by','modified_date')
    search_fields = ('title','description')
    save_on_top = True


class ActivityAdminInline(admin.TabularInline):
    model = Activity
    extra = 0


class BikeAdmin(admin.ModelAdmin):

    list_display = ('id','created_by','name','default','brand','model','distance','elevation')
    list_editable = ('name','default')
    exclude = ('created_date','modified_by','modified_date')
    search_fields = ('name','brand','model')
    save_on_top = True
    inlines = [GearAdminInline, ActivityAdminInline]


class APIAccessTokensAdmin(admin.ModelAdmin):

    list_display = ('id','created_by','athlete_id','subscription_id','access_token','expires_at')
    list_editable = ('athlete_id','subscription_id')
    exclude = ('created_date','modified_by','modified_date')
    search_fields = ('api','subscription_id','title','description','created_by__username')
    save_on_top = True


admin.site.register(Bike, BikeAdmin)
admin.site.register(Gear, GearAdmin)
admin.site.register(Activity, ActivityAdmin)
admin.site.register(APIAccessTokens, APIAccessTokensAdmin)
