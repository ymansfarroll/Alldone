'use strict';

/**
 * Module dependencies.
 * @private
 */

import Joi from 'joi';
import app from './lib/app.js';
import winstonLogger from './lib/loggers/winston.loggers.js';

import { 
    JOI_PORT_VALIDATION_ERROR,
    SUCCESSFUL_APPLICATION_SET_UP } from './lib/helpers/constants.js';

/**
 * Build application entry point.
 * @param {Number} todoListServicePort Application entry point port.
 */

const startTodoListService = (todoListServicePort) => {

    try {        
        // Validate as valid port the entry point parameter.
        Joi.assert(
            todoListServicePort,
            Joi // for chaining
                .number()
                .port()
                .messages(JOI_PORT_VALIDATION_ERROR)
        );
        // The server is stored in case of further use cases.
        const server = app // for chaining.
                           .listen(todoListServicePort)
                           // Listen to net.Server events, reference to net module in NodeJS documentation.
                           .on('listening', () => winstonLogger.info(                               
                                 // Application setting message. 
                                 SUCCESSFUL_APPLICATION_SET_UP.concat(todoListServicePort)
                               )
                            )
                            .on('error', (err) => winstonLogger.error(err));        
    } catch (err) {
        winstonLogger.error(err.message);
    }
}

startTodoListService(process.env.SERVER_PORT);




