# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=mintally.settings
WORKDIR /code
COPY ./app/requirements.txt /code/
RUN pip install -r requirements.txt
COPY ./app /code/
