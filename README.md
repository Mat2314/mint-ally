# mint-ally
HackYeah! Mental Health challenge application

## Running locally

First remember to fill .env files with proper values. Take a look at .env.example files in the following directories:

- .env.example
- app/mintally/.env.example

```
### In root directory
$ docker-compose up

### To run frontend in development mode
$ cd frontend/
$ ng serve
```

Now go to `http://127.0.0.1:4200` to use the application.

To see Django admin panel go to `http://127.0.0.1:{PORT}/admin`

## Running in production mode
```
### Build angular application to be deployed on production server
$ cd frontend/
$ ng build 

### Get back to the root catalogue and run docker compose
$ docker-compose -f docker-compose.production.yml up
```

## Seeders
To populate database with example values you might want to use the seeders.

```
### Create daily notifications
$ python manage.py notifications_seeder

### Create example articles
$ python manage.py articles_seeder

```