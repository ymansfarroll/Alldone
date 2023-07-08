'use strict';

/**
 * Authentication routes.
 * @module lib/routes/auth.routes
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import { Router } from 'express';

import athenticationControllers from '../controllers/auth.controllers.js';

const router = Router();

router.post( '/signup', athenticationControllers.registerUserDatabase );
router.post( '/signin', athenticationControllers.authenticateUserApplication );

export default router;