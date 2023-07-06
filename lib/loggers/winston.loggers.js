'use strict';

/**
 * Winston format configuration.
 * @module lib/loggers/winston.loggers 
 * @see module:lib/loggers/helpers/constants
 * @see module:lib/loggers/helpers/winston.helpers
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import { winstonCustomFormat } from './helpers/winston.helpers.js';
import { DEFAULT_WINSTON_LOG_LEVEL } from './helpers/constants.js';

import { 
    createLogger, 
    format,
    transports } from 'winston'; 
                                        
const winstonLogger = createLogger({   

    level: process.env.WINSTON_LOG_LEVEL || DEFAULT_WINSTON_LOG_LEVEL,
    format: format.combine(
        // winston formats pipeline.
        format.timestamp(),
        winstonCustomFormat, 
    ),
    transports: [ 
        new transports.Console()
    ]
});

export default winstonLogger;