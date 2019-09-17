from django.contrib.auth import logout
from django.shortcuts import redirect
from django.urls import reverse

from social_core.exceptions import AuthAlreadyAssociated
from social_django.middleware import SocialAuthExceptionMiddleware

class FacebookAuthAlreadyAssociatedMiddleware(SocialAuthExceptionMiddleware):
    """ Redirect users to desired-url when AuthAlreadyAssociated exception occurs. """
    def process_exception(self, request, exception):
        if isinstance(exception, AuthAlreadyAssociated):
            if request.backend.name == "facebook":
                message = "This facebook account is already in use."
                if message in str(exception):
                    logout(request)

        return redirect(reverse("geartracker:dashboard"))
