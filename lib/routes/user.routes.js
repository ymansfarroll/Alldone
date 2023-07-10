'use strict';

/**
 * User management routes.
 * @module lib/routes/user.routes
 * @see module:lib/controllers/user.controllers
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import { Router } from 'express';

import userAccountControllers from '../controllers/user.controllers.js';

const router = Router();

/**
 * Route HTTP Method requests (CRUD) to specified paths inside the application.
 * Description:
 * POST - Create records in the database (C).
 * GET - Retrieve records from the database (R).
 * PUT - Update records in the database (U).
 * DELETE - Delete records in the database (D).
 * @public
 */

router // chaining 
    .get( '/', userAccountControllers.readUserAccountSpecification )
    .delete( '/', userAccountControllers.deleteUserAccountSpecification );

export default router;
