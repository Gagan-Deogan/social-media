import axios from "axios";
export const setupAuthHeader = (token: string | null) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
};
