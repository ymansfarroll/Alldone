'use strict';

/**
 * User management controllers.
 * @module lib/controllers/user.controllers
 * @see module:lib/models/User.models
 * @param {Object} request Object containing properties, methods and so on related to client-request.
 * @param {Object} response Object containing properties, methods and so on related to server-request.
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import User from '../models/User.models.js';

import { 
    UNRECOVERED_FIELDS,
    SUCCESSFUL_REQUEST_STATUS,
    UNSUCCESSFUL_REQUEST_STATUS,
    SUCCESSFUL_REQUEST_RESPONSE } from '../helpers/constants.js';

/**
 * Retrieve a user specification from the database based on its global identififier, (a.k.a) _id.
 * @public
 */

export const readUserAccountSpecification = async (request, response) => { // it might be ( req, res ) for short.

    // User information retrieved from the authorization middleware.
    const storedUserInformation = request.account; 
    
    let userReadingResponse = await User.findOne({ 
        '_id': storedUserInformation._id
    }, {
        ...UNRECOVERED_FIELDS,
        password: false // Exclude the password from the request response.
    }) // for chaining

       .lean()  // Ensure to retrieve a plain JS object rather than an instance of the Mongoose Document class.
       .exec(); // Get a better stack traces to debugging purposes.

    response.status( SUCCESSFUL_REQUEST_STATUS ).json({
        status: SUCCESSFUL_REQUEST_STATUS,
        acknowledged: true,
        payload: {
            userAccountInformation: userReadingResponse
        }
    }); 
}

/**
 * Drop a user specification from the database based on its global identififier, (a.k.a) _id.
 * @public
 */

export const deleteUserAccountSpecification = async (request, response) => { // it might be ( req, res ) for short.

    // User information retrieved from the authorization middleware.
    const storedUserInformation = request.account; 

    let userDeletionResponse = await User.deleteOne({
        '_id': storedUserInformation._id
    });

    // Even if the user is logged in the application, the deletion request might fail because of others reasons.
    if ( userDeletionResponse.deletedCount ) {

        response.status( SUCCESSFUL_REQUEST_STATUS ).json({
            status: SUCCESSFUL_REQUEST_STATUS,
            acknowledged: userDeletionResponse.acknowledged,
            response: SUCCESSFUL_REQUEST_RESPONSE.DELETE
        });
    } else { 
        // Reference to RFC 7231 - HTTP/1.1: Semantics and Content for further details.
        throw createHttpError( UNSUCCESSFUL_REQUEST_STATUS );
    }
}

const userAccountControllers = {
    readUserAccountSpecification,
    deleteUserAccountSpecification
}

export default userAccountControllers;
