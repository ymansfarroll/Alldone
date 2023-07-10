'use strict';

/**
 * Decouple HTTP requests by domain.
 * @module lib/routes/index.routes
 * @see module:lib/routes/auth.routes
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import { Router } from 'express';

import userTaskRoutes from './task.routes.js';
import userAccountRoutes from './user.routes.js';
import authenticationRoutes from './auth.routes.js';

import passport from 'passport';

const router = Router();

router // chaining
    
    .get( '/', (request, response) => response.render( 'auth', { layout: 'index' } )) // it might be ( req, res ) for short.

    .use( '/auth', authenticationRoutes )
    .use( '/profile', passport.authorize( 'jwt', { failureRedirect: '/signin' } ), userAccountRoutes )
    .use( '/profile/task', passport.authorize( 'jwt', { failureRedirect: '/signin' } ), userTaskRoutes );

export default router;