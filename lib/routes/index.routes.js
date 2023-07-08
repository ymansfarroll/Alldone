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

import authenticationRoutes from './auth.routes.js';

const router = Router();

router.use( '/', authenticationRoutes );

export default router;