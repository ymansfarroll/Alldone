'use strict';

/**
 * Authentication middlewares.
 * @module lib/middlewares/auth.middlewares
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import { PERSONAL_USER_INFORMATION } from '../helpers/constants.js';

import {
    createFullNameSignUpValidationChain,
    createUserNameSignUpValidationChain,
    createPasswordSignUpValidationChain,
    createEmailAddressSignUpValidationChain } from './helpers/validator.helpers.js';

/**
 * Validate signup user information data from request payload.
 * @returns {Array} Payload validation constraints.
 * @public
 */

export const userSignUpValidation = () =>

    [
        createFullNameSignUpValidationChain(PERSONAL_USER_INFORMATION.fullname),
        createUserNameSignUpValidationChain(PERSONAL_USER_INFORMATION.username),
        createEmailAddressSignUpValidationChain(PERSONAL_USER_INFORMATION.email),
        createPasswordSignUpValidationChain(PERSONAL_USER_INFORMATION.password)       
    ];

const athenticationMiddlewares = {
    userSignUpValidation
}

export default athenticationMiddlewares;

