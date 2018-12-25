from django.http import Http404, HttpResponseRedirect

def redirect(request):
    assert request.method == 'GET'

    uri = request.GET.get('uri', None)
    key = request.GET.get('key', None)

    return HttpResponseRedirect('%s%s' % (uri, key))
