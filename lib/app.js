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

import url from 'url';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import createHttpError from 'http-errors';
import handlebars from 'express-handlebars';

import routes from './routes/index.js';
import httpLoggingMiddleware from './middlewares/morgan.middlewares.js';
import passportJWTStrategyConfiguration from './auth/passport.js';

import { CORS_OPTIONS } from './helpers/constants.js';

passportJWTStrategyConfiguration(); // Passport middleware configuration.

const __dirname = url.fileURLToPath( new URL( '.', import.meta.url )); // Path to current directory.

const app = express(); // Express application instance.

// Express-handlebars configuration.

const hbs = handlebars.create({    

    layoutsDir: path.resolve( __dirname, 'views', 'layouts' ),
    extname: 'hbs',
    defaultLayout: false,
    partialsDir: path.resolve( __dirname, 'views', 'partials' )
}) 

app
   .engine( 'hbs', hbs.engine )
   .set( 'view engine', 'hbs' ) // Set the application to use the hbs engine.
   .set( 'views', path.resolve( __dirname, 'views' ));

// Serves static files out of public.
app.use(express.static( path.resolve( __dirname, 'public' )));   

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
    cookieParser() // for parsing cookies.
]);

app.use( '/', routes );

app.use( () => {     
    throw createHttpError(404); // 404.hbs
});

export default app;