'use strict';

/**
 * Database Task schema definition.
 * @module lib/models/schemas/Task.schemas
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import mongoose from 'mongoose';

import { APPLICATION_DEFAULT_TASK_COLOR } from '../../helpers/constants.js';

/**
 * Task-schema properties definition.
 * @namespace TaskSchema
 * @prop {String} name Task's owner name.
 * @prop {String} description Description of the task.
 * @prop {Date} date Scheduled date for this task. 
 * @prop {Object} visibility Task visibility level - public (true) / private (false).
 * @prop {String} color Task identifier color. 
 * @prop {Date} estimation Estimation of time to accomplish the task.
 * @prop {Array} comments Comment associated to this task. 
 * @public
 */

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    visibility: {
        level: {
            type: Boolean,
            default: true, // Public visibility.
        },
        members: [String] // Allowed members in case of private visibility.
    },
    color: {
        type: String,
        default: APPLICATION_DEFAULT_TASK_COLOR
    },
    estimation: {
        minutes: {
            type: Number, 
            default: 0
        },
        hours: {
            type: Number, 
            default: 0
        },
        days: {
            type: Number, 
            default: 0
        }
    },
    comments: [
        {
            description: String,
            media: [String] //  URLs to media stored in cloud-based services.        
        }
    ]
},{    
    timestamps: true // Built-in CreatedAt and UpdatedAt properties.
  }
);

export default TaskSchema;
