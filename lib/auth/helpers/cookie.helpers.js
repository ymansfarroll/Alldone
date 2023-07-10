'use strict';

/**
 * Passport's helpers.
 * @module lib/auth/helpers/cookie.helpers
 * @public
 */

export const cookieExtractor = (request, response) => { // it might be ( req, res ) for short.
    let jwt = null; // Just in case it wasn't provided.

    if (request && request.cookies) {
        jwt = request.cookies['jwt']; // Extract jwt token from cookies.
    }
    // Return jwt token to passport middleware.
    return jwt;
}