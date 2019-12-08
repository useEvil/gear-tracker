from django.contrib.auth import logout
from django.shortcuts import redirect
from django.urls import reverse
from knox.models import AuthToken

from social_core.exceptions import AuthAlreadyAssociated
from social_django.middleware import SocialAuthExceptionMiddleware

class FacebookAuthAlreadyAssociatedMiddleware(SocialAuthExceptionMiddleware):

    """ Redirect users to desired-url when AuthAlreadyAssociated exception occurs. """
    def process_exception(self, request, exception):
        if isinstance(exception, AuthAlreadyAssociated):
            if request.backend.name == "facebook":
                message = "account is already in use."
                if message in str(exception):
                    logout(request)
                    return redirect(reverse("dashboard"))


class TokenAuthenticationMiddleware:

    """ if the user is logged in (is_active) then set the X-Token header """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.user and request.user.is_authenticated and request.user.is_active:
            _, response['X-Token'] = AuthToken.objects.create(request.user)
        return response

