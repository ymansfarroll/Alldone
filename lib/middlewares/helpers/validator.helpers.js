'use strict';

/**
 * Authentication validation's helpers.
 * @module lib/middlewares/helpers/validator.helpers
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import validator from 'express-validator'; 

import { PERSONAL_USER_INFORMATION } from '../../helpers/constants.js';

/**
 * Create reusable validation chain for required fields.
 * @returns {validator.ValidationChain} Request validation chain.
 * @private
 */

const
    // Exists? -> Empty?
    createExistsValidationChain = (field) =>

        validator // for chaining

            .body(field.name)
            // Optional?
            .optional(field.optional)
            .exists()
            .withMessage(PERSONAL_USER_INFORMATION.default.required)
            .bail()
            .notEmpty() // analogous to .not().isEmpty()
            .withMessage(PERSONAL_USER_INFORMATION.default.empty)
            .bail()

/**
 * Create custom validation chain for fullname payload field.
 * @returns {validator.ValidationChain} Request validation chain.
 * @public
 */        

 export const 
    // Exists? -> Empty? -> Sanitization? -> Only letters?
    createFullNameSignUpValidationChain = (field) => 
 
        createExistsValidationChain(field) // for chaining

            .matches(/([a-zA-Z]{3,})+([a-zA-Z]{3,})\s/)
            .withMessage(field.errors.default)

/**
 * Create custom validation chain for username payload field.
 * @returns {validator.ValidationChain} Request validation chain.
 * @public
 */        

export const 
    // Exists? -> Empty? -> Is length greater than?
    createUserNameSignUpValidationChain = (field) => 
    
        createExistsValidationChain(field) // for chaining

            .isLength({ min: field.length }) // Define username constraint.
            .withMessage(field.errors.default);

/**
 * Create custom validation chain for email payload field.
 * @returns {validator.ValidationChain} Request validation chain.
 * @public
 */

export const 
    // Exists? -> Empty? -> Sanitization -> Email?
    createEmailAddressSignUpValidationChain = (field) => 
    
        createExistsValidationChain(field) // for chaining

            .toLowerCase()
            .trim()
            .isEmail()
            .withMessage(field.errors.default);
/**
 * Create custom validation chain for password payload field.
 * @returns {validator.ValidationChain} Request validation chain.
 * @public
 */            

export const 
    // Exists? -> Empty? -> Strong enough?
    createPasswordSignUpValidationChain = (field) => 

        createExistsValidationChain(field) // for chaining

            .isStrongPassword({ // Define password constraints.
                minLength: 10,
                minLowercase: 3,
                minUppercase: 3,
                minNumbers: 2,
                minSymbols: 2
            })
            .withMessage(field.errors.default);


            


