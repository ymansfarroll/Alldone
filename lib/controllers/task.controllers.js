'use strict';

/**
 * User associated task controllers.
 * @module lib/controllers/task.controllers
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

export const readAllUserTaskSpecification = async (request, response) => { // it might be ( req, res ) for short.

    response.json('Autorizado');

    
}


const userTaskControllers = {
    readAllUserTaskSpecification
}

export default userTaskControllers;
