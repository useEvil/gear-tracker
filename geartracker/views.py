import base64, logging

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.files.storage import FileSystemStorage
from django.core.management import call_command
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render_to_response, render
from django.template import Context, loader, RequestContext

from geartracker.lib.decorators import login_not_required
from geartracker.lib.strava import StravaAPI
from geartracker.lib.tasks import task_parse_gpx, task_consume_strava


@login_not_required
def home(request):
    return render(request, 'index.html')

@login_not_required
def strava_consume_activity(request, user_id, activity_id):
    try:
        user = User.objects.get(id=user_id)
        gpx = task_consume_strava.delay(user, activity_id)
    except Exception as err:
        return HttpResponse("NOTOK: {}".format(err), status=200)

    return HttpResponse('OK', status=200)

@login_not_required
def strava_authorization(request):
    strava = StravaAPI()
    context = {
        'authorization_url': strava.strava_authorization_url()
    }

    return render_to_response('strava.html', context=context)

@login_not_required
def strava_authorized(request):
    strava = StravaAPI()
    code = request.get('code')
    token_response = strava.exchange_code_for_token(client_id=settings.STRAVA_CLIENT_ID, client_secret=settings.STRAVA_CLIENT_SECRET, code=code)
    access_token = token_response.get('access_token')
    refresh_token = token_response.get('refresh_token')
    expires_at = token_response.get('expires_at')

    strava.access_token = access_token
    strava.refresh_token = refresh_token
    strava.token_expires_at = expires_at
    althete = strava.get_athlete()
    return HttpResponse('OK', status=200)

@login_not_required
def strava_refresh_token(request):
    client = Client()
    if time.time() > strava.token_expires_at:
        refresh_response = strava.refresh_access_token(client_id=settings.STRAVA_CLIENT_ID, client_secret=settings.STRAVA_CLIENT_SECRET, refresh_token=slient.refresh_token)
        access_token = refresh_response.get('access_token')
        refresh_token = refresh_response.get('refresh_token')
        expires_at = refresh_response.get('expires_at')
    return HttpResponse('OK', status=200)

def upload(request):

    uploaded_file_url = None

    if request.method == 'POST' and request.FILES.get('gpx_file'):
        gpx_file = request.FILES.get('gpx_file')
        storage = FileSystemStorage()
        filename = storage.save(gpx_file.name, gpx_file)
        uploaded_file_url = storage.url(filename)

        try:
            with open(gpx_file) as gpx_file_io:
                gpx = task_parse_gpx.delay(user, gpx_file)
        except Exception as err:
            return HttpResponse("NOTOK: {}".format(err), status=200)

    context = {
        'uploaded_file_url': uploaded_file_url
    }
    return render_to_response('upload.html', context=context)

