import { EditReducerInitialState, EditReducerActions } from "./profile.types";

export const reducer = (
  state: EditReducerInitialState,
  action: EditReducerActions
) => {
  switch (action.type) {
    case "SET_FULLNAME":
      return { ...state, newFullname: action.payload };
    case "SET_BIO":
      return { ...state, newBio: action.payload };
    case "SET_PROFILE_IMAGE":
      return { ...state, newProfileImage: action.payload };
    case "SET_HEADER_IMAGE":
      return { ...state, newHeaderImage: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
  }
};
