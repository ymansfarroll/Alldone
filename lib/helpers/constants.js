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

    USER_SUB_COLLECTION_IDENTIFIER = process.env.DB_DEV_NAME + '.user',
    TASK_SUB_COLLECTION_IDENTIFIER = process.env.DB_DEV_NAME + '.task';

export const // HTTP request constants.

    SUCCESSFUL_REQUEST_STATUS = 200, 
    UNSUCCESSFUL_CREATION_REQUEST_STATUS = 409,
    UNAUTHORIZED_SIGN_IN_REQUEST_STATUS = 401;
    
export const // User credentials constants.

    INCORRECT_USER_PASSWORD =  'INCORRECT_USER_PASSWORD',
    USER_DOES_NOT_EXITS = 'USER_CREDENTIALS_DOES_NOT_EXITS',
    USER_EXITS_ALREADY = 'USER_CREDENTIALS_EXITS_ALREADY';

export const // Logging configuration constants.
    
    DEFAULT_WINSTON_LOG_LEVEL = 'info';       

export const // JWT constants.

    JWT_TOKEN_EXPIRATION_TIME = '5min';    
 
export const // Application signal constants.

    SIGTERM_APPLICATION_SIGNAL = 'SIGTERM signal received. Application termination request',
    SIGINT_APPLICATION_SIGNAL = 'SIGINT signal received. Application interruption request via (CTRL-C)';

export const // HTTP request successful responses.

    SUCCESSFUL_REQUEST_RESPONSE = { 
        'POST': 'APPLICATION_RECORD_CREATION_SUCCEEDED',
        'PUT': 'APPLICATION_RECORD_UPDATE_SUCCEEDED',
        'DELETE': 'APPLICATION_RECORD_DELETION_SUCCEEDED'
}    

export const // Application middlewares configuration.

    CORS_OPTIONS = { 
        'origin': '*',
        'allowedHeaders': [ 'application/json', 'application/x-www-form-urlencoded' ],
        'methods': [ 'POST', 'GET', 'PUT', 'DELETE' ] // CRUD HTTP verbs.
    }

export const // Payload validation constants.

    PERSONAL_USER_INFORMATION = {

        // Default validation error messages.

        'default': {
            'required': 'PAYLOAD_FIELD_IS_REQUIRED',
            'empty': 'PAYLOAD_FIELD_IS_EMPTY'
        },

        /*
           Validation fields description:

           name: Validation field name. 
           optional: Validation optional field.
           length: Validation field length. 
           messages: Validation error message per use cases.
        */

        'fullname': {
            'name': 'fullname',
            'optional': true,
            'errors': {
                'default': 'PAYLOAD_FULL_NAME_FIELD_IS_NOT_ALLOWED_TO_CONTAIN_OTHER_THAN_TWO_SEPARATED_WORDS'

                // Custom error messages here.
            }
        }, 
        'username': {
            'name': 'username',
            'optional': false,
            'length': 10,
            'errors': {
                'default': 'PAYLOAD_USERNAME_MUST_BE_CONTAIN_AT_LEAST_TEN_CHARACTERS'

                // Custom error messages here.
            }
        }, 
        'email': {
            'name': 'email',
            'optional': false,
            'errors': {
                'default': 'PAYLOAD_EMAIL_FIELD_MUST_BE_A_VALID_EMAIL_ADDRESS' 

                // Custom error messages here.
            }
        }, 
        'password': {
            'name': 'password',
            'optional': false,
            'errors': {
                'default': 'PAYLOAD_PASSWORD_FIELD_IS_NOT_A_STRONG_ENOUGH_PASSWORD'

                // Custom error messages here.
            }
        }
    };

export const // Task identifier color.
    
    APPLICATION_DEFAULT_TASK_COLOR = '#F8F9FA'; // Bootstrap light-class color.