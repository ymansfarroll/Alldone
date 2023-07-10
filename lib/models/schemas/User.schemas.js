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

import {
    EMAIL_VALIDATION_REGEX,
    EMAIL_VALIDATION_MESSAGE } from '../../helpers/constants.js';

import Task from '../Task.models.js';     

/**
 * User-schema properties definition.
 * @namespace UserSchema
 * @prop {String} fullname User full name.
 * @prop {String} username Unique user identifier.
 * @prop {String} email Valid user email address.
 * @prop {String} password Strong enough user password. 
 * @public
 */

const UserSchema = new mongoose.Schema({
    fullname: String,
    username: {
        type: String,
        unique: true,
        required: true  
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
        // Another validation layer, but this time on a database level.
        match: [ EMAIL_VALIDATION_REGEX, EMAIL_VALIDATION_MESSAGE ] // Built-in validation.
    },
    password: {
        type: String, 
        required: true
    }
},{    
    timestamps: true // Built-in CreatedAt and UpdatedAt properties.
  }
);

UserSchema // for chaining

    .pre( 'save', async function () {
        // Asynchronously generates a salt.
        const salt = await bcrypt.genSalt();
        // Create a hash-password based on this salt and the plain password.
        this.password = await bcrypt.hash(this.password, salt);
        // Continues to the next middleware.
    })

    .pre( 'deleteOne', async function () {        
        // Delete user references on cascade.
        await Task.deleteMany({ 'user': this._id });
        // Delete nested user reference on cascade.
        await Task.updateMany( {}, {
            '$pull': {
                'members': this._id
            }
        });
    })

    .methods.comparePassword = async function (password) {
        // Compare the provided password against the stored one.
        return await bcrypt.compare(password, this.password);
    };

export default UserSchema;