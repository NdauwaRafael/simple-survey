import {
SURVEYS_LOAD_SUCCESS,
SURVEYS_LOAD_FAILED
  } from "../../constants/actionTypes";

  const initialState = {
    surveys: [],
    surveysLoading: false
  };

  
export default (state = initialState, action) => {
    switch (action.type) {
        case SURVEYS_LOAD_SUCCESS:
            return {
              ...state,
              surveys: action.surveys
            };

        case SURVEYS_LOAD_FAILED:
            return {
                ...state,
                surveys: []
            }
        default:
            return state;
    }
}