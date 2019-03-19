import base64, logging

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.core.management import call_command
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import Context, loader, RequestContext

from geartracker.lib.decorators import login_not_required


@login_not_required
def home(request):
    return HttpResponse('OK', status=200)
