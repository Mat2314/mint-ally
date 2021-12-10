# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY ./app/requirements.txt /code/
RUN pip install -r requirements.txt
COPY ./app /code/
