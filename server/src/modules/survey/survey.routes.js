const express = require('express');
const { Joi } = require('express-validation');
const surveyCtrl = require('./survey.controller');
const { validate } = require('../../helpers');

const router = express.Router();

const paramValidation = {
  createSurvey: {
    body: Joi.object({
      title: Joi.string().required(),
      description: Joi.string()
    })
  },
};

router.route('/')
  /** GET /api/surveys - Get list of surveys */
  /** POST /api/surveys - create a survey */
  .get(surveyCtrl.list)
  .post(validate(paramValidation.createSurvey), surveyCtrl.create);

 /** UPDATE /api/surveys/:surveyId/complete - Mark survey as complete */
// router.route('/:surveyId/complete')
//   .put(surveyCtrl.markComplete);

  /** Load survey when API with surveyId route parameter is hit */
// router.param('surveyId', surveyCtrl.load);

module.exports = router;
