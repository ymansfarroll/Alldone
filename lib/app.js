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

import httpLoggingMiddleware from './loggers/morgan.loggers.js';

const app = express(); // Express application instance.

/**
 * Middlewares's set to register in middleware stack, order matters so be careful to make
 * changes of the current set.
 * @public
 */

 app.use([
    httpLoggingMiddleware // for logging HTTP requests.
]);

export default app;