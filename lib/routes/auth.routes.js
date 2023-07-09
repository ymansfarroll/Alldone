'use strict';

/**
 * User authentication routes.
 * @module lib/routes/auth.routes
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import { Router } from 'express';

import athenticationControllers from '../controllers/auth.controllers.js';
import athenticationMiddlewares from '../middlewares/auth.middlewares.js';

const router = Router();

router.post( '/signup', 
    athenticationMiddlewares.userSignUpValidation(), athenticationControllers.registerUserDatabase );

router.post( '/signin', athenticationControllers.authenticateUserApplication );

export default router;