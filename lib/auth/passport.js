'use strict';

/**
 * Passport-jwt strategy configuration.
 * @module lib/auth/passport
 * @public
 */

/** 
 * Module dependencies.
 * @private
*/

import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import User from '../models/User.models.js';

const passportJWTStrategyConfiguration = () => {
    const jwtStrategyOptions = {};

    jwtStrategyOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtStrategyOptions.secretOrKey = process.env.ALLDONE_SERVICE_JWT_SEED;

    passport.use( 
        new Strategy( jwtStrategyOptions, async (payload, done) => {

            let userReadingResponse = await User.findOne({ 
                '_id': payload._id // JWT payload property, @see module:lib/controllers/auth.controllers for further details.
            }) // for chaining
               .lean()  // Ensure to retrieve a plain JS object rather than an instance of the Mongoose Document class.
               .exec(); // Get a better stack traces to debugging purposes.
        
            if ( userReadingResponse ) {  
                done(null, userReadingResponse);
            } else {
                done(null, false);
            }
        }
    ));
}

export default passportJWTStrategyConfiguration;