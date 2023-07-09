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
 * @prop {String} password User password. 
 * @public
 */

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true
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
        await this.model('Task').deleteMany({ 'user': this._id });
    })

    .methods.comparePassword = async function (password) {
        // Compare the provided password against the stored one.
        return await bcrypt.compare(password, this.password);
    };

export default UserSchema;