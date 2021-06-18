export type EditProfileProps = {
  fullname: string;
  bio: string;
  headerImageURL: string;
  imageURL: string;
  handleClose: Function;
};

export type EditReducerActions =
  | {
      type: "SET_FULLNAME";
      payload: string;
    }
  | {
      type: "SET_BIO";
      payload: string;
    }
  | {
      type: "SET_PROFILE_IMAGE";
      payload: File;
    }
  | {
      type: "SET_HEADER_IMAGE";
      payload: File;
    }
  | {
      type: "SET_STATUS";
      payload: "IDLE" | "PENDING" | "FULFILLED" | "ERROR";
    };
export type EditReducerInitialState = {
  newFullname: string;
  newBio: string;
  newProfileImage: File | string;
  newHeaderImage: File | string;
  status: "IDLE" | "PENDING" | "FULFILLED" | "ERROR";
};
