'use strict';

/**
 * Passport's helpers.
 * @module lib/auth/helpers/cookie.helpers
 * @public
 */

export const cookieExtractor = (request) => { // cookieExtractor = request => a valid sentence as well.
    let jwt = null; // Just in case it wasn't provided.

    if (request && request.cookies) {
        jwt = request.cookies['jwt']; // Extract jwt token from cookies.
    }
    // Return jwt token to passport middleware.
    return jwt;
}