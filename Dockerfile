FROM python:3.6.5
ADD . /code
WORKDIR /code
RUN pip install --upgrade pip setuptools wheel
RUN pip install -Ur requirements.txt
RUN pip install -e .
