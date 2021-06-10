import { CurrentUser } from "types/user";
export type InitialState = {
  currentUser: CurrentUser | null;
  token: string | null;
  status: "FULFILLED" | "ERROR" | "PENDING" | "IDLE";
  error: string | null;
};
export type FetchError = {
  error: string;
};
export type response = {
  currentUser: CurrentUser;
  token: string;
};
