export type InitialState = {
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmPassword: string;
};
export type Action =
  | {
      type: "SET_EMAIL";
      payload: string;
    }
  | {
      type: "SET_FULLNAME";
      payload: string;
    }
  | {
      type: "SET_USERNAME";
      payload: string;
    }
  | {
      type: "SET_PASSWORD";
      payload: string;
    }
  | {
      type: "SET_CONFIRM_PASSWORD";
      payload: string;
    };
