web: gunicorn geartracker.wsgi:application --timeout 500 --limit-request-line 8190 --limit-request-fields 200 --limit-request-field_size 8190 --keep-alive 5 --log-level debug --log-file -
worker: celery worker --loglevel=debug --app=settings.celery.app
