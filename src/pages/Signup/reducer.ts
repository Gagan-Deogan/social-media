import { InitialState, Action } from "./type";
export const initialState: InitialState = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_FULLNAME":
      return { ...state, fullname: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload.toLowerCase() };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
  }
};
