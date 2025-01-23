# secret-sauce

A fun project demonstrating how to securely store a secret key using a password and a public key.

[website](https://pedrobern.github.io/secret-sauce/)

## Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [Yarn](https://yarnpkg.com/) v1.22+

## Create `.env` Files and Generate Your Public Key

For this project, you'll need two environment files:

1. **`.env`**: A standard environment file used by the application to store environment variables. This will later hold the public key.
2. **`.env.script`**: Contains your actual password and secret key. Be sure to keep this file safe and private.

Run the following commands to create the files:

```
touch .env
echo "PASSWORD=MY_PASSWORD" > .env.script
echo "SECRETKEY=A3-AAAAAA-BBBBBB-CCCCC-DDDDD-EEEEE-FFFFF" >> .env.script
```

Run the following command to install dependencies and generate the public key:

```
yarn
yarn public-key
```

## Dev, Test and Build

- `yarn dev`: Starts the development server with hot-reloading for local development.
- `yarn test`: Runs all tests
- `yarn build`: Compiles the project into a production-ready build in the `dist/` directory.
