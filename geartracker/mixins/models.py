import datetime

from django.db import models
from django.contrib.auth.models import User


class CreatedDate(models.Model):
    """
    Mixin providing general fields for keeping track of an objects created info.
    """
    created_by = models.ForeignKey(User, related_name='%(class)s_created_by', null=True, on_delete=models.SET_NULL)
    created_date = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        if not self.created_date:
            self.created_date = datetime.datetime.now()

        if not self.created_by_id:
            # use the default user
            self.created_by = User.objects.get(pk=1)

        super(CreatedDate, self).save(*args, **kwargs)

    class Meta:
        abstract = True


class ModifiedDate(CreatedDate):
    """
    Mixin providing general fields for keeping track of an objects modified info.
    """
    modified_by = models.ForeignKey(User, related_name='%(class)s_modified_by', null=True, on_delete=models.SET_NULL)
    modified_date = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.modified_date:
            self.modified_date = datetime.datetime.now()

        if not self.modified_by_id:
            # use the default user
            self.modified_by = User.objects.get(pk=1)

        super(ModifiedDate, self).save(*args, **kwargs)

    class Meta:
        abstract = True
