const mongoose = require('mongoose');
const httpStatus = require('http-status');
const _ = require('lodash');
const APIError = require('../../helpers/APIError');

/**
 * Survey Schema
 */
const SurveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Statics
 */
SurveySchema.statics = {
  /**
   * Get Survey
   * @param {ObjectId} id - The objectId of survey.
   * @returns {Promise<Survey, APIError>}
   */
  async get(id) {
    const survey = await this.findById(id).exec();
    if (!survey) {
      throw new APIError('No such survey exists!', httpStatus.NOT_FOUND);
    }
    return survey;
  },

  /**
   * Get survey by email
   * @param {ObjectId} title - The email of survey.
   * @returns {Promise<Survey, APIError>}
   */
  async getByTitle(title) {
    const survey = await this.findOne({ title }).exec();
    if (!survey) {
      throw new APIError('No such survey exists!', httpStatus.NOT_FOUND);
    }
    return survey;
  },

  /**
   * List surveys in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of surveys to be skipped.
   * @param {number} limit - Limit number of surveys to be returned.
   * @returns {Promise<Survey[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

/**
 * @typedef Survey
 */
module.exports = mongoose.model('Survey', SurveySchema);
