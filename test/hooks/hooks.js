'use strict';

/**
 * Test environment hooks.
 * @module test/hooks/hooks
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import mongoose from 'mongoose';
import databaseConfiguration from '../../lib/database/database.js';
import winstonLogger from '../../lib/loggers/winston.loggers.js';

export const mochaHooks = () => {
    return {
        async beforeAll () {
            // winstonLogger.silent = true; // Turn off the loggers.
            // Initial database connection. 
            await mongoose.connect( databaseConfiguration.dbURI ); // Neither user nor password is required in test environment.           
        },
        async afterAll () {
            // winstonLogger.silent = false; // Turn on the loggers.
            // Drop the database after finishing all the tests. 
            await mongoose.connection.db.dropDatabase();
            // Ensure to close the connection through setting [force] parameter to [true].
            await mongoose.connection.close( true );            
        }
    }
}