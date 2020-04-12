# CS3200 Project

## Pre-requisites

`node` and `npm` must be installed to build and run this project. Please download at the following link:

[Download page for node.js/npm](https://nodejs.org/en/download/)

`node v13.12.0` and `npm 6.14.4` were used in the writing of this project.

## Building and running the front-end

Switch to the `web` directory and edit the `.env` file in the project root, in the same
directory as the `package.json`, if necessary.

The .env file (used by the `dotenv` library for configuration) must be in the following format:

```
REACT_APP_SERVER_HOST=host the app is running on, e.g. localhost
REACT_APP_SERVER_PORT=port the app is running on, e.g. 3000
```

A default one is provided, which assumes that React is configured to run locally at `localhost:3000`.

Then, install dependencies and start the React app using npm.

```
> npm install
> npm start
```

## Building and running the back-end

Switch to the `server` directory and edit the `.env` file in the project root, in the same
directory as the `package.json`, if necessary.

The .env file must be in the following format:

```
SERVER_HOST=host the app is running on, e.g. localhost
SERVER_PORT=port the app is running on, 3001

DB_HOST=host MySQL server is running on
DB_PORT=port MySQL server is running on
DB_USER=db username
DB_PASSWORD=db password
DB_DATABASE=db schema
```

A default one is provided, which assumes the node.js back-end is configured to run locally at `localhost:3001`,
and that MySQL server is running locally at `localhost:3306`.

Then, install dependencies and start the node.js app using npm.

```
> npm install
> npm start
```

## 