'use strict';

/**
 * User-associated task routes.
 * @module lib/routes/task.routes
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import { Router } from 'express';

import userTaskControllers from '../controllers/task.controllers.js';

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

router
    // Retrieve all user task records.
    .get( '/all', userTaskControllers.readAllUserTaskSpecification );

router
    .post( '/', userTaskControllers.createUserTaskSpecification );

export default router;