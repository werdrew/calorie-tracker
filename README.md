# CS3200 Project

# Running the application

## Pre-requisites

`node` and `npm` must be installed to build and run this project. Please download at the following link:

[Download page for node.js/npm](https://nodejs.org/en/download/)

`node v13.12.0` and `npm 6.14.4` were used in the writing of this project.

Additionally, `MySQL` must be installed; specifically, we used version `8.0.19`. MySQL workbench
can also be installed to more easily import and interact with the data (also version `8.0.19`).
Please download at the following links:

[Download for MySQL](https://dev.mysql.com/downloads/installer/)
[Download for MySQL workbench](https://dev.mysql.com/downloads/workbench/)

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

# Pre-populating the database

## Pre-requisites

In order to run the webscrapers provided, `python3` and `pip3` are required.

[python3](https://www.python.org/downloads/)

`pip3` should be automatically installed with the installation.

## Background

`db/webscrape` holds two programs, which scrape websites for food/exercise data and compile them to
equivalent SQL insert statements based on our schemas for `food` and `exercise`. This was done so that
users wouldn't need to manually enter information about very common foods and exercises, and can more
easily begin using the application.

This process was already done and is included in the provided database dump, but here, we go through the
process for generating these files.

## Process

Go to `db/webscrape` and create a directory called `data`.

```
> cd db/webscape
> mkdir data
```

Then, install the dependencies and run each scraper.

```
> pip3 install -r requirements.txt
> ./food_to_sql.py
> ./exercise_to_sql.py
```

`data/insert_exercise.sql` and `data/insert_food.sql` will contain the insert statements that can be run
directly in MySQL workbench to populate the `food` and `exercise` tables.