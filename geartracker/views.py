import base64, logging, json, os

from datetime import datetime
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.core.files.storage import FileSystemStorage
from django.core.management import call_command
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render_to_response, render
from django.template import Context, loader, RequestContext
from django.urls import reverse

from geartracker.lib.decorators import login_not_required
from geartracker.lib.strava import StravaAPI
from geartracker.lib.tasks import task_parse_gpx, task_consume_strava
from geartracker.models import Bike, Gear, Activity, APIAccessTokens

strava = StravaAPI()


@login_not_required
def home(request):
    return render(request, 'index.html')

@login_not_required
def strava_consume_activity(request, user_id, activity_id):
    try:
        gpx = task_consume_strava.delay(user_id, activity_id)
    except Exception as err:
        return HttpResponse("NOTOK: {}".format(err), status=200)

    return HttpResponse('OK', status=200)

@login_not_required
def strava_authorization(request):
    context = {
        'authorization_url': strava.authorization_url()
    }

    return render_to_response('strava.html', context=context)

@login_not_required
def strava_authorized(request):
    code = request.GET.get('code')
    token_response = strava.exchange_code_for_token(code)

    api, created = APIAccessTokens.objects.get_or_create(
        created_by=request.user,
        api='strava'
    )
    api.access_token = token_response.get('access_token')
    api.refresh_token = token_response.get('refresh_token')
    api.expires_at = datetime.fromtimestamp(token_response.get('expires_at'))
    api.save()

    return redirect(reverse("dashboard"))

@login_not_required
def strava_consume(request):
    response = json.loads(request.body)

    task_consume_strava.delay(request.user.id, activity_id=response['object_id'])

    return HttpResponse('OK', status=200)


def upload(request):
    uploaded_file_url = None

    if request.method == 'POST' and request.FILES.get('gpx_file'):
        gpx_file = request.FILES.get('gpx_file')
        storage = FileSystemStorage()
        filename = storage.save(gpx_file.name, gpx_file)
        uploaded_file_url = storage.url(filename)
        uploaded_file_path = "{}{}".format(settings.BASE_DIR, uploaded_file_url)
        try:
            gpx = task_parse_gpx.delay(request.user.id, uploaded_file_path)
        except Exception as err:
            return HttpResponse("NOTOK: {} {}".format(err, gpx_file), status=200)

    context = {
        'uploaded_file_url': uploaded_file_url
    }

    return render(template_name='upload.html', context=context, request=request)

