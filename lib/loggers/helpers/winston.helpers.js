'use strict';

/**
 * Winston's helpers.
 * @module lib/loggers/helpers/winston.helpers
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import { format } from 'winston'; 

/**
 * Custom winston logger format.
 * @public
 */

export const winstonCustomFormat = format.printf( (info) => { 

    const { timestamp, level, message, ...rest } = info; // Pipeline values.

    return `${ JSON.stringify({ timestamp, level, message, ...rest }) }` // Ensure the correct json order.
});