## Crawler GraphQL Api

Crawler API, a service that parses a URL and returns meta-data from that web page. It employs redis to  ensure fast response for sites already visited.

* [Technologies](#technologies)
* [Getting Started using Docker](#getting-started-using-docker-recommended)
* [Getting Started without Docker](#getting-started-without-docker)

## Technologies

* [Docker](https://docs.docker.com/get-docker/)
* [NestJs](https://docs.nestjs.com/)
* [Redis](https://redis.io/)
* [GraphQL](https://graphql.org/)

## Getting Started using Docker (Recommended)

### Docker Setup

* create a .env file from the .env.sample file `cp .env.example .env` and fill in the necessary environment variables

* Ensure docker is installed on your local machine. Refer to [Docker Guide](https://docs.docker.com/get-docker/)
* Once docker is installed run `docker-compose build` from the root of the application

### Running Docker Development Server

* Start the development server by running `docker-compose up -d crawler` This will bring up the app and it's dependencies. It can take a few seconds to be able to access your local environment via browser even after you see 'done' on the console.

* Now access the server on `localhost:3000 or 127.0.0.1:3000` this depends on the port specified in the `.env` file but it defaults to 5200 is none is specified

### Running Docker Test

* Run `docker-compose run -e APP_ENV=test -e PORT=5201 crawler_test` to test the app

## Getting Started without Docker

### Setup

* create a .env file from the .env.sample file `cp .env.example .env` and fill in the necessary environment variables

* run `yarn` to install dependencies

### Running Development Server

* Run `yarn run start:dev` to start the development server

* Now access the server on `localhost:3000 or 127.0.0.1:3000` this depends on the port specified in the `.env` file but it defaults to 5200 is none is specified

### Running Test

* Run `yarn run test`

### To Query the endpoint

#### The test expects meta information returned from a url that has been passed in. see example below


import this [Postman collection](https://www.getpostman.com/collections/d012391a8374dbcf63c0)
OR visit  [App Demo](https://crawler-graphql-api.herokuapp.com/graphql) and use the query below in the playground

```
{
  getMetas(url: "https://graphql.org/") {
    title
    description,
    source,
    image{
      url,
      width,
      height
    }
  }
}


```
