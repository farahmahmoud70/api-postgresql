# Storefront Backend Project

## Getting Started

This repo contains a Node and Express app as a Front-backend store app. To get started, clone this repo and run `npm install` in your terminal at the project root.

## Table of content

- Folder structure.
- Instructions on how to run the project.
- To get start with the code.
- Scripts to be run
- License.

## Folder structure

```bash
├── dist
├── migrations
├── spec
├── src
|   ├── handlers
|   |  ├── orders.ts
|   |  ├── products.ts
|   |  ├── users.ts
|   ├── models
|   |  ├── orders.ts
|   |  ├── products.ts
|   |  ├── users.ts
|   ├── routes
|   |  ├── index.ts
|   ├── utilities
|   |  ├── helper.ts
│   ├── database.ts
│   ├── server.ts
├── .env (should be added by you with your own environment variables)
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .prettierignore
├── .prettierrc
├── database.json
├── docker-compose.yml
├── tsconfig.json
├── LICENSE.txt
├── README.md
├── package-lock.json
├── package.json
```

## To get start with the code.

1. Should add .env file and add environment variables
   - please follow the following naming in the .env file
     POSTGRES_HOST
     POSTGRES_DB
     POSTGRES_TEST_DB
     POSTGRES_USER
     POSTGRES_PASSWORD
     ENV
     BCRYPT_PASSWORD
     SALT_ROUNDS
     NEW_USER_TOKEN
2. Run in root terminal `npm install`
3. Should have docker installed to run `docker-compose.yml`
4. In docker terminal psql -h 127.0.0.1 -U frontbackend_store_user postgres
   - For the first time run `CREATE DATABASE frontbackend_store`
   - In the project root terminal run `db-migrate up`
5. Use the endpoints in the postman

## To get start with the code

#### You Will Find :

- `src/index.ts` with the server setup.
- `src/database.ts` with the database setup and creating the DB client.
- `src/models` with the models folder, the `products.ts, orders.ts and users.ts` will be found for the database structure.
- `src/models/tests` with the tests folder the models tests will be found each model separated in a file named after the model.
- `src/handlers` with the models folder, the `products.ts, orders.ts and users.ts` will be found for the endpoints.
- `src/handlers/tests` with the tests folder the models tests will be found each model separated in a file named after the model.
- `src/routes/index.ts` with the routes.
- `src/utilities/helper.ts` with a helper function to verify token.

## Scripts to be run

- `npm run start` to run the app.
- `npm run watch` to run the watcher to keep track when changes happens.
- `npm run build` to compile ts files into js files and put them in dist folder.
- `npm run lint` to run linting against the linting roles.
- `npm run prettier` to run prettier against the prettier roles.
- `npm run test` to build the app and run jasmine engine for test cases.

## License

- Farah Mahmoud
- Advanced Full-Stack Web Development
- FWD - JAN Cohort 2023
