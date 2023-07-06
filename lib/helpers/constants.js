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