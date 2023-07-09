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
import authenticationRoutes from './auth.routes.js';

import passport from 'passport';

const router = Router();

router.use( '/auth', authenticationRoutes );
router.use( '/profile/task', passport.authorize( 'jwt', { failureRedirect: '/signin' } ), userTaskRoutes );

export default router;