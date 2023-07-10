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

    // Principal application template.   
    .get( '/', (request, response) => response.render( 'index', { layout: 'main' } )) 

    // Authentication management templates. 
    .get( '/signin', (request, response) => response.render( 'signin', { layout: 'auth' } )) 
    .get( '/signup', (request, response) => response.render( 'signup', { layout: 'auth' } )) 

    // Authentication management routes.
    .use( '/auth', authenticationRoutes )
    
    // User management routes.
    .use( '/profile', passport.authorize( 'jwt', { failureRedirect: '/signin' } ), userAccountRoutes )
    .use( '/profile/task', passport.authorize( 'jwt', { failureRedirect: '/signin' } ), userTaskRoutes );

export default router;