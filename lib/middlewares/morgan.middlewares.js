'use strict';

/**
 * Morgan format configuration.
 * @module lib/middlewares/morgan.middlewares
 * @see module:lib/loggers/winston.loggers 
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import os from 'os';
import morgan from 'morgan';
import winstonLogger from '../loggers/winston.loggers.js';

morgan.token( 'hostname', function getHostname() { return os.hostname(); } );

const jsonMorganFormat = (tokens, request, response) => { // it might be ( req, res ) for short.
    
    return JSON.stringify({
        'remote-address': tokens ['remote-addr'] (request, response),
        'http-version': tokens ['http-version'] (request, response),
        'method': tokens ['method'] (request, response),
        'url': tokens ['url'] (request, response),
        'status-code': tokens ['status'] (request, response),
        'hostname': tokens ['hostname'] (request, response)
    });
}

const httpLoggingMiddleware = morgan( jsonMorganFormat, {

    stream: {
        write: (message) => {
            const data = JSON.parse(message);
            // This message will be omitted in test environment.
            winstonLogger.http('incoming-request', data);
        }
    }
});

export default httpLoggingMiddleware;