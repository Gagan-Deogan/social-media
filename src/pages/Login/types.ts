export type InitialState = {
  email: string;
  password: string;
};
export type Action =
  | {
      type: "SET_EMAIL";
      payload: string;
    }
  | {
      type: "SET_PASSWORD";
      payload: string;
    };
