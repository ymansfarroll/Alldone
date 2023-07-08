'use strict';

/**
 * Application's constants.
 * @module lib/helpers/constants
 * @public
 */

export const // Application setting constants.
    
    SUCCESSFUL_APPLICATION_SET_UP = 'Server listening on port ',
    FAILED_APPLICATION_SET_UP = 'Server connection error: ';

export const // Joi message constants.

    JOI_PORT_VALIDATION_ERROR = {
            // {#value} references the local context value from the pipeline.
            'number.port': 'Entry point port {#value} is not a valid port number'
    };

export const // Application error messages.

    INTERNAL_ERROR = 'Application internal error: ';


export const // Database connection constants.

    SUCCESSFUL_DATABASE_CONNECTION = 'Database connection established on ',
    DATABASE_CONNECTION_FINISHED = 'Database connection finished',    
    DATABASE_CONNECTION_TERMINATION = 'Database connection finished through app termination',
    FAILED_DATABASE_CONNECTION = 'Initial database connection failed on: ';    

export const // Model configuration constants.

    USER_SUB_COLLECTION_IDENTIFIER = process.env.DB_DEV_NAME + '.user';

export const // HTTP request constants.

    SUCCESSFUL_REQUEST_STATUS = 200, 
    UNSUCCESSFUL_CREATION_REQUEST_STATUS = 409;   

export const // Logging configuration constants.
    
    DEFAULT_WINSTON_LOG_LEVEL = 'info';       

export const // JWT constants.

    JWT_TOKEN_EXPIRATION_TIME = '5min';    
 