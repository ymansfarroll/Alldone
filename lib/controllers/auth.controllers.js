'use strict';

/**
 * User authentication controllers.
 * @module lib/controllers/auth.controllers
 * @see module:lib/models/User.models
 * @param {Object} request Object containing properties, methods and so on related to client-request.
 * @param {Object} response Object containing properties, methods and so on related to server-request.
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import url from 'url';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import User from '../models/User.models.js';

import {
    USER_EXITS_ALREADY,
    USER_DOES_NOT_EXITS,
    INCORRECT_USER_PASSWORD,
    JWT_TOKEN_EXPIRATION_TIME,
    SUCCESSFUL_REQUEST_STATUS,  
    UNAUTHORIZED_SIGN_IN_REQUEST_STATUS,
    UNSUCCESSFUL_CREATION_REQUEST_STATUS, } from '../helpers/constants.js';

export const registerUserDatabase = async (request, response) => { // it might be ( req, res ) for short.

    // Extracts the validation results from the request.
    validationResult(request) // for chaining
                                // Throw an error if the validation result has errors.
                                .throw();

    const registrationUserInformation = request.body;

    let userReadingResponse = await User.findOne({ 
        'username': registrationUserInformation.username 
    }) // for chaining
       .lean()  // Ensure to retrieve a plain JS object rather than an instance of the Mongoose Document class.
       .exec(); // Get a better stack traces to debugging purposes.
    

    if ( !userReadingResponse ) {
        let userCreationResponse =  await User.create( registrationUserInformation );

        const jwtUserToken = jwt.sign( { '_id': userCreationResponse._id }, process.env.ALLDONE_SERVICE_JWT_SEED, {
            'expiresIn': JWT_TOKEN_EXPIRATION_TIME
        });     

        /*    
            1.0.0 Deprecated - API-REST application approach.
                
                response.status( SUCCESSFUL_REQUEST_STATUS ).json({
                    status: SUCCESSFUL_REQUEST_STATUS,
                    acknowledged: true,
                    response: SUCCESSFUL_REQUEST_RESPONSE.POST,
                    payload: {
                        jwtUserToken
                    }
                });  

                // Likewise acceptable according to RFC 7231 - HTTP/1.1: Semantics and Content.
                // response.status(201).end();
                
            } else { 
                // Reference to RFC 7231 - HTTP/1.1: Semantics and Content for further details.
                throw createHttpError( UNSUCCESSFUL_CREATION_REQUEST_STATUS, USER_EXITS_ALREADY );
            } 
        */

        // 2.0.0 Stable - Template-based application approach, current one.

        const expressCookieOptions = { 
            'httpOnly': true,
            'expires': new Date( Date.now() + JWT_TOKEN_EXPIRATION_TIME * 1000 ) 
        };

        response // for chaining

            .status( SUCCESSFUL_REQUEST_STATUS ) // Successful creation.
            .cookie( 'jwt', jwtUserToken, expressCookieOptions )
            .redirect('/');   

    } else {

        response // for chaining

        .status( UNSUCCESSFUL_CREATION_REQUEST_STATUS )
        .redirect( url.format(

            {
                pathname: '/signin',
                query: {
                    auth_error: USER_EXITS_ALREADY     
                }
            }
        ));
    }
}

export const authenticateUserApplication = async (request, response) => { // it might be ( req, res ) for short.
    
    const authenticationUserInformation = request.body;

    let userReadingResponse = await User.findOne({ 
        'username': authenticationUserInformation.username 
    }, {
        // If found, retrieve just these user properties from the database.
        '_id': true,
        'password': true        
    }) // for chaining
       .exec(); // Get a better stack traces to debugging purposes.

    if ( userReadingResponse ) {        
        let passwordComparison = await userReadingResponse.comparePassword(authenticationUserInformation.password);
        
        if ( passwordComparison ) {
            
            const jwtUserToken = jwt.sign( { '_id': userReadingResponse._id }, process.env.ALLDONE_SERVICE_JWT_SEED, {
                'expiresIn': JWT_TOKEN_EXPIRATION_TIME
            }); 

            /*
                1.0.0 Deprecated - API-REST application approach.

                        response.status( SUCCESSFUL_REQUEST_STATUS ).json({
                            status: SUCCESSFUL_REQUEST_STATUS,
                            acknowledged: true,
                            payload: {
                                jwtUserToken
                            }
                        });          
                    } else {
                        // Reference to RFC 7231 - HTTP/1.1: Semantics and Content for further details.
                        throw createHttpError( UNAUTHORIZED_SIGN_IN_REQUEST_STATUS, INCORRECT_USER_PASSWORD );
                    }
                } else {
                    // Reference to RFC 7231 - HTTP/1.1: Semantics and Content for further details.
                    throw createHttpError( UNAUTHORIZED_SIGN_IN_REQUEST_STATUS, USER_DOES_NOT_EXITS );
                }
            */

            // 2.0.0 Stable - Template-based application approach, current one.

            const expressCookieOptions = { 
                'httpOnly': true,
                'expires': new Date( Date.now() + JWT_TOKEN_EXPIRATION_TIME * 1000 ) 
            };

            response // for chaining

                .status( SUCCESSFUL_REQUEST_STATUS ) // Successful authentication.
                .cookie( 'jwt', jwtUserToken, expressCookieOptions )
                .redirect('/profile/task/all');

        } else {

            response // for chaining

                .status( UNAUTHORIZED_SIGN_IN_REQUEST_STATUS )
                .redirect( url.format(
                    
                    {
                        pathname: '/signin',
                        query: {
                            auth_error: INCORRECT_USER_PASSWORD   
                        }
                    }
                )
            );
        }
    } else {

        response // for chaining

        .status( UNAUTHORIZED_SIGN_IN_REQUEST_STATUS )
        .redirect( url.format(

            {
                pathname: '/signin',
                query: {
                    auth_error: USER_DOES_NOT_EXITS     
                }
            }
        ));
    }    
}

const athenticationControllers = {
    registerUserDatabase,
    authenticateUserApplication
}

export default athenticationControllers;