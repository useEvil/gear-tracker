import base64, logging, json, os

from datetime import datetime
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render
from django.template import Context, loader, RequestContext
from django.urls import reverse

from geartracker.lib.decorators import login_not_required
from geartracker.lib.strava import StravaAPI
from geartracker.lib.tasks import task_parse_gpx, task_consume_strava
from geartracker.models import Bike, Gear, Activity, APIAccessTokens

logger = logging.getLogger(__name__)
strava = StravaAPI()

@login_not_required
def home(request):
    return render(request, 'index.html')


def dashboard(request):
    return render(request, 'build/index.html')

@login_not_required
def strava_consume_activity(request, user_id=None, activity_id=None):
    if request.body:
        req_body = json.loads(request.body)
        logger.debug('request: JSON [{0}]'.format(req_body))
    logger.debug('request: GET [{0}]'.format(request.GET))
    logger.debug('request: POST [{0}]'.format(request.POST))
    try:
        gpx = task_consume_strava.delay(user_id, activity_id)
    except Exception as err:
        return HttpResponse("NOTOK: {}".format(err), status=200)

    return HttpResponse('OK', status=200)

@login_required
def strava_authorization(request):
    context = {
        'authorization_url': strava.authorization_url()
    }

    return render(request, 'strava.html', context)

@login_required
def strava_authorized(request):
    if request.body:
        req_body = json.loads(request.body)
        logger.debug('request: JSON [{0}]'.format(req_body))
    logger.debug('request: GET [{0}]'.format(request.GET))
    logger.debug('request: POST [{0}]'.format(request.POST))
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

    # subscribe to strava webhook
    strava.push_subscription()

    return redirect(reverse("dashboard"))

@login_not_required
def strava_subscribe(request):
    # subscribe to strava webhook
    raw = strava.push_subscription()
    print("==== push_subscription.raw [{0}]".format(raw))
    raw = strava.handle_subscription(raw)
    print("==== handle_subscription.raw [{0}]".format(raw))

    return HttpResponse(json.dumps(raw), status=200)

@login_not_required
def strava_subscribed(request):
    hub_challenge = request.GET.get('hub.challenge')
    hub_verify_token = request.GET.get('hub.verify_token')
    raw = strava.handle_subscription(request.GET)
    print("==== strava_subscribed.raw [{0}]".format(raw))

    return HttpResponse('OK', status=200)

@login_not_required
def strava_consume(request):
    response = json.loads(request.body)
    logger.debug('request: POST [{0}]'.format(request.POST))
    logger.debug('request: JSON [{0}]'.format(req_body))
    object_type = response.get('object_type')
    if object_type == 'activity':
        task_consume_strava.delay(request.user.id, activity_id=response.get('object_id'))
    elif object_type == 'athlete_id':
        task_consume_strava.delay(request.user.id, athlete_id=response.get('object_id'))
    else:
        logger.debug('request: object_type [{0}]'.format(object_type))
        logger.debug('request: object_id [{0}]'.format(object_id))
        return HttpResponse('NOTOK', status=200)

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
#             import traceback
#             traceback.print_exc()
#             logger.debug('Upload: gpx err {} module {}'.format(err, task_parse_gpx))
            return HttpResponse("NOTOK: {} {}".format(err, gpx_file), status=200)

    context = {
        'uploaded_file_url': uploaded_file_url
    }

    return render(request, 'upload.html', context)


@login_not_required
def service(request):
    return render(request, 'service_form.html')

