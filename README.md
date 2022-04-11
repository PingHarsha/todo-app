# Microsite Backend FastAPI Project

## How to setup project?

### Clone the project from Gitlab

git clone this project or download the project to your computer locally

### Start the server (Build & Up the docker images)

```sh
docker-compose up -d --build
```

### Run a migration

```sh
docker-compose exec backend alembic upgrade head
```

### View the API Documentation (This will ensure the server is running)

1. Open your web browser of choice
1. In the URL enter: http://0.0.0.0:3000/docs

## Development Commands

### Check the status of the docker containers

```sh
docker-compose ps -a
```

### Check logs of fastapi server

```sh
docker-compose logs -f --tail 10 backend
```

### Stop the server

```sh
docker-compose stop
```

### Down the server

```sh
docker-compose down
```

## Alembic DB Migrations

Alembic is used for generating migrations for the database with SQL Alchemy.

### Create an autogenerate migration

```sh
docker-compose -f docker-compose.yml run backend alembic revision --autogenerate -m [commit message]
```

### Running a Migration

```sh
docker-compose -f docker-compose.yml run backend alembic upgrade head
```
