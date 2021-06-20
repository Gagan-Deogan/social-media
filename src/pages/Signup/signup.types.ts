export type InitialState = {
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmPassword: string;
  status: "IDLE" | "PENDING" | "FULFILLED" | "ERROR";
  error: string;
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
    }
  | {
      type: "SET_STATUS";
      payload: "IDLE" | "PENDING" | "FULFILLED" | "ERROR";
    }
  | {
      type: "SET_ERROR";
      payload: string;
    };
export type handleSignupProps = {
  email: string;
  fullname: string;
  username: string;
  password: string;
};
export type SignUpResponse = {
  data: string;
};
