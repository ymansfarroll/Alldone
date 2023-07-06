'use strict';

/**
 * Module dependencies.
 * @private
 */

import app from './lib/app.js';

/**
 * Build application entry point.
 * @param {Number} todoListServicePort Application entry point port.
 */

const startTodoListService = (todoListServicePort) => {

    const server = app // for chaining.
                       .listen(todoListServicePort)
                       // Listen to net.Server events, reference to net module in NodeJS documentation.
                       .on('listening', () => console.log('Server listen in port', todoListServicePort));
}

startTodoListService(3000);




