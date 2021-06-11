import axios from "axios";
const { REACT_APP_API } = process.env;
export const setupDefaultsHeader = (token: string | null) => {
  axios.defaults.baseURL = REACT_APP_API;
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
};
