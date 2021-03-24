import * as surveysAPI from "../../constants/API/surveys";
import {
    SURVEYS_LOAD_FAILED,
    SURVEYS_LOAD_SUCCESS
  } from "../../constants/actionTypes";
  import {tokenConfig} from '../auth';
  
 const loadSurveysSuccess = (resp) => {
    return {
      type: SURVEYS_LOAD_SUCCESS,
      surveys: resp
    };
  };

   const loadSurveysFailed= (error) => {
    return {
      type: SURVEYS_LOAD_FAILED,
      error
    };
  };

  export const getSurveys = () => (dispatch, getState) => {
    surveysAPI.loadSurveys(tokenConfig(getState))
        .then(resp => {
            return dispatch(loadSurveysSuccess(resp.data))
        })
        .catch(error => {
            return dispatch(loadSurveysFailed("Failed to load surveys!"))
        })
};