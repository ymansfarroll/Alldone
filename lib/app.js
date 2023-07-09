'use strict';

/**
 * Build express application.
 * @module lib/app
 * @see module:lib/auth/passport
 * @see module:lib/helpers/constants
 * @see module:lib/routes/index.routes
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import 'express-async-errors';

import routes from './routes/index.js';
import httpLoggingMiddleware from './middlewares/morgan.middlewares.js';
import passportJWTStrategyConfiguration from './auth/passport.js';

import { CORS_OPTIONS } from './helpers/constants.js';

passportJWTStrategyConfiguration(); // Passport middleware configuration.

const app = express(); // Express application instance.

/**
 * Middlewares's set to register in middleware stack, order matters so be careful to make
 * changes of the current set.
 * @public
 */

app.use([
    cors(CORS_OPTIONS), // cors-enabled for all origins with some constraints.
    helmet(), // Set HTTP response headers.
    httpLoggingMiddleware, // for logging HTTP requests.
    express.json(), // for parsing content-type: application/json.
    express.urlencoded({ extended: true }), // for parsing content-type: application/x-www-form-urlencoded.
]);

app.use( '/', routes );

export default app;