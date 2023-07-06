'use strict';

/**
 * Application's constants.
 * @module lib/helpers/constants
 * @public
 */

export const // Successful application setting.
    
    SUCCESSFUL_APPLICATION_SET_UP = 'Server listening on port ';

export const // Joi message constants.

    JOI_PORT_VALIDATION_ERROR = {
            // {#value} references the local context value from the pipeline.
            'number.port': 'Entry point port {#value} is not a valid port number'
    };