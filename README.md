# Challenge App

This is an api which creates events, payments and also fetches data about billing, charges, users and payments. Works with a dockerized mongo db database and executes tests using an in memory database.

## Requirements

- Node and npm
- Docker and docker-compose

## Setup

Install dependencies

```bash
npm install
```

Start a dockerized MongoDB database (first time)

```bash
docker-compose up -d
```

OR if already there is a container called mongo_charges...

```bash
docker start mongo_charges
```

and finally

```bash
npm start
```

## Getting started

### Users endpoints

User creation:

```bash
POST localhost:3000/users
```

body JSON data:

```json
{
    "name": "John Doe",
    "status": "ACTIVO"
}
```

Get created users:

```bash
GET localhost:3000/users
```

Event (or charges) creation, you can load many charges in each endpoint with different dates, if date is not provided then it will asume current date and time:

```bash
POST localhost:3000/events
```

body JSON data:

```json
{
  "event_id": 1,
  "amount": 600,
  "currency": "ARS",
  "user": "<user created id>",
  "event_type": "MERCADOPAGO",
  "date": "2020-05-11T14:02:03.409Z"
}
```

Get created events:

```bash
GET localhost:3000/events
```

Get user billing:

```bash
GET localhost:3000/users/<user id>/billing
```

Get user (it will bring up also status):

```bash
GET localhost:3000/users
```

Create payments

```bash
POST localhost:3000/payments
```

body json data:

```json
{
  "user": "<user id>",
  "event": "<event id to pay>",
  "amount": 500,
  "currency": "ARS"
}
```

## Tests

Executes all tests

```bash
npm test
```
