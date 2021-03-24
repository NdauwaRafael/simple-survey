import axios from "axios";
import { url } from "./config";


export const loadSurveys = (user, config) => {
  return axios.get(url + "api/surveys", user, config);
};

export const addSurvey = (user, config) => {
    return axios.post(url + "api/surveys", user, config);
  };