import { InitialState, Action } from "./types";

export const initialState: InitialState = {
  email: "Gagan@gmail.com",
  password: "Gagan@123",
};

export const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
