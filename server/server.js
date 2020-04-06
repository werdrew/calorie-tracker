/* Load the configuration. */
require('dotenv').config();

/* Set up the server. */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();
server.use(bodyParser.json());
server.use(cors());

server.listen(process.env.SERVER_PORT);

/* Export the server. */
module.exports = server;