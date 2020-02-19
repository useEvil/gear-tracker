FROM python:3.8.1
ADD . /code
WORKDIR /code
RUN pip install --upgrade pip setuptools wheel
RUN pip install -Ur requirements.txt
RUN pip install -e .
RUN apt-get update
RUN apt-get -y install vim

RUN python /code/manage.py collectstatic --noinput

EXPOSE 5000
CMD gunicorn settings.wsgi -b 0.0.0.0:5000
