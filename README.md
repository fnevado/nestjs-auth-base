<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

A base project with authorization using NestJS.

## Installation

```bash
$ npm install
```

## Setting up

First of all, you have to set up the proeject using a .env file on root directory with thw following structure:
```bash
JWT_SECRET = <secret used for jwt sign>

DATABASE_HOST = <database host>
DATABASE_PORT = <database port>
DATABASE_USER = <database user>
DATABASE_PASS = <database password>
DATABASE_NAME = <database name>
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
