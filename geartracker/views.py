import base64, logging

from django.template import Context, loader, RequestContext
from django.core.management import call_command
from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.conf import settings

from dataingester.lib.decorators import login_not_required


@login_not_required
def post_activity(request, date, status):
    try:
        call_command('post_activity', date, status=status)
    except Exception as err:
        return HttpResponse("NOTOK: {}".format(err), status=200)

    return HttpResponse('OK', status=200)
