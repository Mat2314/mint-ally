from celery import Celery
from mintally import celeryconfig
from celery.schedules import crontab

app = Celery('mintally', broker='amqp://guest:guest@rabbitmq:5672', backend='rpc://',
             include=['mintally.tasks'])

app.config_from_object(celeryconfig)

app.conf.beat_schedule = {
    'hello_world': {
        'task': 'mintally.tasks.hello_world',
        'schedule': crontab(day_of_month="*", hour="*", minute='*'),
    }
}

if __name__ == '__main__':
    app.start()
