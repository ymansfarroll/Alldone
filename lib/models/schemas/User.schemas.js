'use strict';

/**
 * Database User schema definition.
 * @module lib/models/schemas/User.schemas
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User-schema properties definition.
 * @namespace UserSchema
 * @prop {String} fullname User full name.
 * @prop {String} username Unique user identifier.
 * @prop {String} email User email address.
 * @prop {String} hash_password SHA256 user password codification. 
 * @public
 */

const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        require: true 
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true  
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    hash_password: String
},{    
    timestamps: true // Built-in CreatedAt and UpdatedAt properties.
  }
);

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
}

export default UserSchema;