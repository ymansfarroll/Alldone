'use strict';

/**
 * Register application signals.
 * @module lin/signals/app.signals
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import winstonLogger from '../loggers/winston.loggers.js';
import { 
    SIGINT_APPLICATION_SIGNAL,
    SIGTERM_APPLICATION_SIGNAL } from '../helpers/constants.js';

process // for chaining

    .on( 'SIGTERM', () => {
        winstonLogger.info(SIGTERM_APPLICATION_SIGNAL);
        // Status code 0 for normal exit.
        process.exit(0);
    })
    .on( 'SIGINT', () => { 
        winstonLogger.info(SIGINT_APPLICATION_SIGNAL);
        // Status code 0 for normal exit.
        process.exit(0);
    })