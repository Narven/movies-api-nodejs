# Movies API

![](https://github.com/Narven/movies-api/workflows/.github/workflows/tests.yml/badge.svg)

> This is a small movies API built on NodeJS. Used for demostration porpuses. This uses a movies database downloaded from [https://www.databasestar.com/sample-database-movies/](https://www.databasestar.com/sample-database-movies/)

API [http://localhost:3000/api/v1](http://localhost:3000/api/v1)

API DOCS: [http://localhost:3000/api-docs/swagger/](http://localhost:3000/api-docs/swagger/)

---

## Tools
This small API uses NodeJS/Typescript, together with some a specific set of libraries to help the job get done.

* Express
* Inversify (Dependency Injection)
* Joi (Validation library)
* Morgan (logging / debugging)
* TypeORM/MySQL2 (Entities/DB ORM)
* Jest (Tests)

---

## Docker/Containers

This API uses for local development a `docker-compose.yml` file with MySQL

run: `docker-compose up`

---

## Configurations (config package)

> All configurations are stored in `./config` just rename it to `.dist.json` to `.json` for you specific environment.

### Install (YARN)

> Yarn package manager is used in this api

run to install dependencies:
```
yarn
```

---

### Data

> this will import the file on `mysql-dump/movies.sql` into to the docker image already running.

run:
```bash
yarn run import
```

---

### Migrations

> This API uses migrations to keep the DB update

#### Create a new migration

```bash
yarn run typeorm migration:generate -n <SOMENAME>
```

#### Run (up)

```bash
yarn run migrations:up
```

#### Run (down)

```bash
yarn run migrations:down
```

---

## Run

> Bring api up...

`yarn run start`

## API Documentation

API Documentation is available at: [http://localhost:3000/api-docs/swagger/](http://localhost:3000/api-docs/swagger/)
