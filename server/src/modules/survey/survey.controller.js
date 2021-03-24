const Survey = require('./survey.model');

/**
 * Load survey and append to req.
 */
 function load(req, res, next, id) {
  Survey.get(id)
    .then((survey) => {
      req.survey = survey;
      return next();
    })
    .catch((e) => next(e));
}

/**
 * Get Survey
 * @returns {Survey}
 */
async function get(req, res) {
  try {
    const survey = await Survey.get(id);
    return res.json(survey);
  } catch (error) {
    return next(error);
  }
}

/**
 * Get Survey list.
 * @property {number} req.query.skip - Number of surveys to be skipped.
 * @property {number} req.query.limit - Limit number of surveys to be returned.
 * @returns {Survey[]}
 */
async function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  try {
    const surveys = await Survey.list({ limit, skip });
    return res.json(surveys);
  } catch (error) {
    return next(error);
  }
}

/**
 * Create Survey
 * @returns {Survey}
 */
 function create(req, res) {

    const survey = new Survey(req.body);
    survey.owner = res.locals.session._id;

    Survey.findOne({ title: survey.title })
    .exec()
    .then((foundSurvey) => {
      if (foundSurvey) {
        throw new APIError('Survey title must be unique', httpStatus.CONFLICT, true);
      }
      return survey.save();
    })
    .then((foundSurvey) => res.json(foundSurvey))
    .catch((e) => next(e));
}

/**
 * Mark complete Survey
 * @returns {Survey}
 */
function markComplete(req, res, next){
  const { survey } = req;
  survey.complete = true;
  survey.save()
  .then((savedSurvey) => res.json(savedSurvey))
  .catch((e) => next(new APIError(e.message, httpStatus.CONFLICT)));

}

module.exports = {
  get,
  list,
  create,
  markComplete
};
