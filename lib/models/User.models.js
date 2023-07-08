'use strict';

/**
 * Database User model definition.
 * @module lib/models/User.models
 * @see module:lib/models/schemas/User.schemas
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import mongoose from 'mongoose';
import UserSchema from './schemas/User.schemas.js';

import { USER_SUB_COLLECTION_IDENTIFIER } from '../helpers/constants.js';

/**
 * Build User model based on UserSchema.
 * @public
 */

const UserModel = mongoose.model( USER_SUB_COLLECTION_IDENTIFIER, UserSchema );

export default UserModel;

