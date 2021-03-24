import axios from "axios";

const url = "https://s4g34.sse.codesandbox.io/";

export const loginUserApi = (user, config) => {
  return axios.post(url + "api/auth/login", user, config);
};

export const logoutUserApi = (config) => {
  return axios.post("api/auth/logout", null, config);
};
