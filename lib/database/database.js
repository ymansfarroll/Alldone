'use strict';

/**
 * Application database configuration.
 * @module lib/database/database
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import mongoose from 'mongoose';
import winstonLogger from '../loggers/winston.loggers.js';

import { SUCCESSFUL_DATABASE_CONNECTION } from '../helpers/constants.js';

const databaseConfiguration = {
    'development': {
        'dbURI': `mongodb://${process.env.DB_DEV_HOST}:${process.env.DB_DEV_PORT}/${process.env.DB_DEV_NAME}`,
        'dbOptions': {
            'user': process.env.DB_DEV_USER,
            'pass': process.env.DB_DEV_PASSWORD
        }
    }
}

const currentDatabaseConfiguration = databaseConfiguration [ process.env.NODE_ENV ];

// Ensure the registration of [connected] event listener before trying to connect to the mongoDB instance.
mongoose.connection.on('connected', () => winstonLogger.info(
                // Database connection message.
                SUCCESSFUL_DATABASE_CONNECTION.concat(currentDatabaseConfiguration.dbURI)
            ) 
        );

export default currentDatabaseConfiguration;
