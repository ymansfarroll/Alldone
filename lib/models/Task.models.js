'use strict';

/**
 * Database Task model definition.
 * @module lib/models/Task.models
 * @see module:lib/models/schemas/Task.schemas
 * @public
 */

/**
 * Module dependencies.
 * @private
 */

import mongoose from 'mongoose';
import TaskSchema from './schemas/Task.schemas.js';

import { TASK_SUB_COLLECTION_IDENTIFIER } from '../helpers/constants.js';

/**
 * Build Task model based on TaskSchema.
 * @public
 */

const TaskModel = mongoose.model( TASK_SUB_COLLECTION_IDENTIFIER, TaskSchema );

export default TaskModel;
