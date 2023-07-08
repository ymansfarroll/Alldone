'use strict';

/**
 * Module dependencies.
 * @private
 */

import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

import User from '../models/User.models.js';

import {
    JWT_TOKEN_EXPIRATION_TIME,
    SUCCESSFUL_REQUEST_STATUS,
    UNSUCCESSFUL_CREATION_REQUEST_STATUS } from '../helpers/constants.js';

export const registerUserDatabase = async (request, response) => { // it might be ( req, res ) for short.

    const userPersonalInformation = request.body;

    let userReadingResponse = await User.findOne({ 
        username: userPersonalInformation.username 
    }) // for chaining
       .lean()  // Ensure to retrieve a plain JS object rather than an instance of the Mongoose Document class.
       .exec(); // Get a better stack traces to debugging purposes.

    if ( !userReadingResponse ) {
        let userCreationResponse =  await User.create( userPersonalInformation );

        const jwtUserToken = jwt.sign( { 'id': userCreationResponse._id }, process.env.ALLDONE_SERVICE_JWT_SEED, {
            'expiresIn': JWT_TOKEN_EXPIRATION_TIME
        });        

        response.status( SUCCESSFUL_REQUEST_STATUS ).json({
            status: SUCCESSFUL_REQUEST_STATUS,
            acknowledged: true,
            response: {
                jwtUserToken
            }
        });        
        // Likewise acceptable according to RFC 7231 - HTTP/1.1: Semantics and Content.
        // response.status(201).end();
    } else {
        throw createHttpError( UNSUCCESSFUL_CREATION_REQUEST_STATUS );
    } 
}

const athenticationControllers = {
    registerUserDatabase
}

export default athenticationControllers;