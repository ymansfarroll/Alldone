'use strict';

/**
 * User-associated task controllers.
 * @module lib/controllers/task.controllers
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import Task from '../models/Task.models.js';

import { 
    UNRECOVERED_FIELDS,
    SUCCESSFUL_REQUEST_STATUS,
    SUCCESSFUL_REQUEST_RESPONSE } from '../helpers/constants.js';

/**
 * Create a user task storage record inside the database.
 * @public
 */

export const createUserTaskSpecification = async (request, response) => { // it might be ( req, res ) for short.

    const userTaskSpecification = request.body,
    // User information retrieved from the authorization middleware.
          storedUserInformation = request.account;      

    userTaskSpecification.user = storedUserInformation._id; // Link refs.

    let taskCreationResponse =  await Task.create( userTaskSpecification );

    response.status( SUCCESSFUL_REQUEST_STATUS ).json({
        status: SUCCESSFUL_REQUEST_STATUS,
        response: SUCCESSFUL_REQUEST_RESPONSE.POST,
        acknowledged: true,
        payload: {
            // Task just created.
            task: taskCreationResponse
        }
    });  
}

/**
 * Retrieve all the tasks from the current user.
 * @public
 */

export const readAllUserTaskSpecification = async (request, response) => { // it might be ( req, res ) for short.

    // User information retrieved from the authorization middleware.
    const storedUserInformation = request.account;

    let userReadingResponse = await Task.aggregate([
        
        {
            '$match': {
                'user': storedUserInformation._id
            }
        },
        {
            '$project': {
                'user': false,
                ...UNRECOVERED_FIELDS,
            }
        }
    ]).exec(); // Get a better stack traces to debugging purposes.

    let populatedUserReadingResponse = await Task.populate(
        
        userReadingResponse, { path: 'members', select: 'username email -_id' } );

    response.status( SUCCESSFUL_REQUEST_STATUS ).json({
        status: SUCCESSFUL_REQUEST_STATUS,
        acknowledged: true,
        payload: {
            // Array contained by user associated tasks.
            tasks: populatedUserReadingResponse
        }
    });  
}

const userTaskControllers = {
    createUserTaskSpecification,
    readAllUserTaskSpecification
}

export default userTaskControllers;
