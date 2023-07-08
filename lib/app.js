'use strict';

/**
 * Build express application.
 * @module lib/app
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import express from 'express';
import 'express-async-errors';
import cors from 'cors';


import httpLoggingMiddleware from './middlewares/morgan.middlewares.js';

import routes from './routes/index.routes.js';

const app = express(); // Express application instance.

/**
 * Middlewares's set to register in middleware stack, order matters so be careful to make
 * changes of the current set.
 * @public
 */

const corsOptions = {
    'origin': '*',
    'allowedHeaders': [ 'application/json', 'application/x-www-form-urlencoded' ],
    'methods': [ 'POST', 'GET', 'PUT', 'DELETE' ] // CRUD HTTP verbs.
}

 app.use([
    cors(corsOptions), // cors-enabled for all origins with some constraints.
    httpLoggingMiddleware, // for logging HTTP requests.
    express.json(), // for parsing content-type: application/json.
    express.urlencoded( { extended: true }) // for parsing content-type: application/x-www-form-urlencoded.
]);

app.use( '/', routes );

export default app;