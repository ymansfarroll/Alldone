'use strict';

/**
 * Module dependencies.
 * @private
 */

import Joi from 'joi';
import app from './lib/app.js';
import mongoose from 'mongoose';
import winstonLogger from './lib/loggers/winston.loggers.js';

import databaseConfiguration from './lib/database/database.js';

import { 
    INTERNAL_ERROR,
    JOI_PORT_VALIDATION_ERROR,
    FAILED_APPLICATION_SET_UP,
    SUCCESSFUL_APPLICATION_SET_UP } from './lib/helpers/constants.js';

import { 
    FAILED_DATABASE_CONNECTION,
    DATABASE_CONNECTION_FINISHED } from './lib/database/helpers/constants.js';
    
/**
 * Build application entry point.
 * @param {Number} allDoneServicePort Application entry point port.
 * @private
 */

const startAllDoneService = async (allDoneServicePort) => {

    try {        
        // Validate as valid port the entry point parameter.
        Joi.assert(
            allDoneServicePort,
            Joi // for chaining
                .number()
                .port()
                .messages(JOI_PORT_VALIDATION_ERROR)
        );
        // Resolve to mongoose if connection succeeded, if so, it might be used for chaining.
        const referenceOfMongoose = await mongoose.connect( 
                                                            databaseConfiguration.dbURI, 
                                                            databaseConfiguration.dbOptions );

        // If reached this point, everything succeeded with initial connection, so it'll be added the
        // remaining listeners to the current connection.

        referenceOfMongoose.connection // for chaining 

            .on('disconnected', () => winstonLogger.info(DATABASE_CONNECTION_FINISHED));

        // The server is stored in case of further use cases.
        const server = app // for chaining

                           // Make available the port [allDoneServicePort] to incoming connections.
                           .listen(allDoneServicePort)
                           
                           // Listen to net.Server events, reference to net module in NodeJS documentation.
                           .on('listening', () => winstonLogger.info(
                               SUCCESSFUL_APPLICATION_SET_UP.concat(allDoneServicePort)))

                           .on('error', (err) => winstonLogger.error(                               
                               FAILED_APPLICATION_SET_UP.concat(err.message)));        
    } catch (err) {
        if (err instanceof mongoose.Error) {            
            // Decouple the initial connection errors from the rest to avoid repetitive error messages.
            winstonLogger.error(FAILED_DATABASE_CONNECTION.concat(err.message));
        } else {            
            // Catch remaining errors arising from the application.
            winstonLogger.error(INTERNAL_ERROR.concat(err.message));
        }
        process.exit(0);
    }
}

startAllDoneService(process.env.SERVER_PORT);



