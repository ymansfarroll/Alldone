'use strict';

/**
 * Module dependencies.
 * @private
 */

import app from './lib/app.js';

import { SUCCESSFUL_APPLICATION_SET_UP } from './lib/helpers/constants.js';

/**
 * Build application entry point.
 * @param {Number} todoListServicePort Application entry point port.
 */

const startTodoListService = (todoListServicePort) => {

    const server = app // for chaining.
                       .listen(todoListServicePort)
                       // Listen to net.Server events, reference to net module in NodeJS documentation.
                       .on('listening', () => console.log(
                           // Application setting message. 
                           SUCCESSFUL_APPLICATION_SET_UP.concat(todoListServicePort)));
}

startTodoListService(3000);




