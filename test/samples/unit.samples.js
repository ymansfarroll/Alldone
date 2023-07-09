'use strict';

/**
 * Unit-test environment samples. 
 * @module test/samples/unit.samples
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import moment from 'moment';

// User task specification samples.

export const VALID_USER_TASK_SPECIFICATION = {};
export const USER_TASK_SPECIFICATION_WITH_INVALID_FIELD = {};
export const INCOMPLETE_USER_TASK_SPECIFICATION = {};
export const USER_TASK_SPECIFICATION_WITHOUT_REQUIRED_FIELD = {};
export const CONTAMINATED_USER_TASK_SPECIFICATION = {};

// Personal user information samples.

export const VALID_PERSONAL_USER_INFORMATION = {
    
    'fullname': 'Software Development Company',
    'username': 'cubanengineer',
    'email': 'manager@cuban.engineer',
    'password': 'cubanengineer.alldone'
};

export const PERSONAL_USER_INFORMATION_WITH_INVALID_FIELD = {
    
    'fullname': 'Software Development Company',
    'username': 'cubanengineer',
    'email': '@cuban.engineer', // Invalid email field.
    'password': 'cubanengineer.alldone'
};

export const PERSONAL_USER_INFORMATION_WITHOUT_REQUIRED_FIELD = {

    'fullname': 'Software Development Company',
    // 'username': 'cubanengineer', -> Required field.
    'email': 'manager@cuban.engineer',
    'password': 'cubanengineer.alldone'
};

export const CONTAMINATED_PERSONAL_USER_INFORMATION = {

    'fullname': 'Software Development Company',
    'username': 'cubanengineer',
    'email': 'manager@cuban.engineer',
    'password': 'cubanengineer.alldone',

    'noUserModelProperty': true // This property should be ignored by the time the model is saved.
};

export const userTaskSpecificationUnitSamples = {
    VALID_USER_TASK_SPECIFICATION,
    INCOMPLETE_USER_TASK_SPECIFICATION,
    CONTAMINATED_USER_TASK_SPECIFICATION,
    USER_TASK_SPECIFICATION_WITH_INVALID_FIELD,
    USER_TASK_SPECIFICATION_WITHOUT_REQUIRED_FIELD,
}

export const personalUserInformationUnitSmaples = {
    VALID_PERSONAL_USER_INFORMATION,
    CONTAMINATED_PERSONAL_USER_INFORMATION,
    PERSONAL_USER_INFORMATION_WITH_INVALID_FIELD,
    PERSONAL_USER_INFORMATION_WITHOUT_REQUIRED_FIELD,
}
