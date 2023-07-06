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
 * @param {Number} allDoneServicePort Application entry point port.
 */

const startAllDoneService = (allDoneServicePort) => {

    try {        
        // Validate as valid port the entry point parameter.
        Joi.assert(
            allDoneServicePort,
            Joi // for chaining
                .number()
                .port()
                .messages(JOI_PORT_VALIDATION_ERROR)
        );
        // The server is stored in case of further use cases.
        const server = app // for chaining.
                           .listen(allDoneServicePort)
                           // Listen to net.Server events, reference to net module in NodeJS documentation.
                           .on('listening', () => winstonLogger.info(                               
                                 // Application setting message. 
                                 SUCCESSFUL_APPLICATION_SET_UP.concat(allDoneServicePort)
                               )
                            )
                            .on('error', (err) => winstonLogger.error(err));        
    } catch (err) {
        winstonLogger.error(err.message);
    }
}

startAllDoneService(process.env.SERVER_PORT);




