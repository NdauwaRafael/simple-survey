import * as authApi from "../../constants/API/auth";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS
} from "../../constants/actionTypes";

//LOGIN
export const loginSuccess = (resp) => {
  return {
    type: LOGIN_SUCCESS,
    payload: resp
  };
};

export const loginFailed = (resp) => {
  return {
    type: LOGIN_FAILED,
    error: resp
  };
};

export const loginUser = (username, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let body = JSON.stringify({ username, password });
  authApi
    .loginUserApi(body, config)
    .then((resp) => {
      console.log(resp);
      dispatch([loginSuccess(resp.data)]);
    })
    .catch((error) => {
      console.log(error);
    });
};

//LOGOUT USER
export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const logoutUser = () => (dispatch, getState) => {
  authApi
    .logoutUserApi(tokenConfig(getState))
    .then((resp) => {
      return dispatch([logoutSuccess(), "Logout success"]);
    })
    .catch((error) => {
      return dispatch("Logout failed");
    });
};

//HELPER CONFIG FOR TOKKEN ROUTES
export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
