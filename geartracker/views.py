import base64, logging, json, os

from units import unit
from datetime import datetime
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect, render
from django.template import Context, loader, RequestContext
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse

from geartracker.lib.decorators import login_not_required
from geartracker.lib.strava import StravaAPI
from geartracker.lib.tasks import task_parse_gpx, task_consume_strava
from geartracker.lib.utils import format_activity, format_athlete
from geartracker.models import Bike, Gear, Activity, APIAccessTokens

logger = logging.getLogger(__name__)
strava = StravaAPI()

@login_not_required
def home(request):
    return render(request, 'index.html')

def dashboard(request):
    return render(request, 'build/index.html')

@login_not_required
@csrf_exempt
def strava_consume(request, user_id=None):
    print("==== user_id [{0}]".format(user_id))
    if request.body:
        req_body = json.loads(request.body)
        logger.debug('request: JSON [{0}]'.format(req_body))
    logger.debug('request: GET [{0}]'.format(request.GET))
    logger.debug('request: POST [{0}]'.format(request.POST))

    if request.method == 'GET' and 'hub.challenge' in request.GET:
        raw = strava.handle_subscription(request.GET)
        return HttpResponse(json.dumps(raw), status=200)

    if request.method == 'POST':
        try:
            task_consume_strava.delay(user_id)
        except:
#             import traceback
#             traceback.print_exc()
#             logger.debug('Upload: gpx err {} module {}'.format(err, task_parse_gpx))
            return HttpResponse('NOTOK', status=200)

    return HttpResponse('OK', status=200)

@login_required
def strava_authorization(request):
    context = {
        'authorization_url': strava.authorization_url()
    }

    return render(request, 'strava.html', context)

@login_required
def strava_authorized(request):
    code = request.GET.get('code')
    token_response = strava.exchange_code_for_token(code)

    api_tokens, created = APIAccessTokens.objects.get_or_create(
        created_by=request.user,
        api='strava'
    )
    api_tokens.access_token = token_response.get('access_token')
    api_tokens.refresh_token = token_response.get('refresh_token')
    api_tokens.expires_at = datetime.fromtimestamp(token_response.get('expires_at'))
    api_tokens.save()

    # set user's access token and subscribe to webhook
    strava.access_token(api_tokens.access_token)
    res = strava.push_subscription(request.user)
    if res:
        api_tokens.subscription_id = res.id
        api_tokens.save()

    return redirect(reverse("dashboard"))

@login_required
def strava_subscribe(request):
    hub_challenge = request.GET.get('hub.challenge')

    # subscribe to strava webhook
    api_tokens = request.user.apiaccesstokens_created_by.first()
    strava.access_token(api_tokens.access_token)
    raw = strava.push_subscription(request.user)
    if raw:
        api_tokens.subscription_id = raw.id
        api_tokens.save()

    return JsonResponse({"hub.challenge": hub_challenge}, status=200, safe=True)

@login_required
def strava_subscribed(request):
    raw = strava.handle_subscription(request.GET)
    if raw and 'id' in raw:
        logger.debug("==== strava_subscribed.raw.id [{0}]".format(raw['id']))
        api_tokens.subscription_id = raw['id']
        api_tokens.save()

    return JsonResponse(raw, status=200, safe=True)

@login_required
def strava_subscriptions(request):
    subscriptions = [{'id': s.id, 'callback_url': s.callback_url} for s in strava.list_subscriptions()]

    return JsonResponse(subscriptions, status=200, safe=False)

@login_required
def strava_athlete(request):
    api_tokens = request.user.apiaccesstokens_created_by.first()
    strava.access_token(api_tokens.access_token)
    athlete = strava.get_athlete()
    if not api_tokens.athlete_id:
        api_tokens.athlete_id = athlete.id
        api_tokens.save()

    return JsonResponse(format_athlete(athlete), status=200, safe=False)

@login_required
def strava_activity(request, activity_id):
    api_tokens = request.user.apiaccesstokens_created_by.first()
    strava.access_token(api_tokens.access_token)
    activity = strava.get_activity(activity_id)

    return JsonResponse(format_activity(activity), status=200, safe=False)

@login_required
def strava_activities(request):
    before = request.GET.get('before')
    after = request.GET.get('after')
    limit = request.GET.get('limit')
    api_tokens = request.user.apiaccesstokens_created_by.first()
    strava.access_token(api_tokens.access_token)
    activities = [format_activity(a) for a in strava.list_activities(before=before, after=after, limit=50)]

    return JsonResponse(activities, status=200, safe=False)

@login_required
def strava_delete_subscriptions(request):
    strava.delete_subscriptions()

    return HttpResponse('OK', status=200)

@login_required
def strava_delete_subscription(request, subscription_id):
    strava.delete_subscription(subscription_id)

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

