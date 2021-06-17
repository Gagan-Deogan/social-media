import { UserProfile } from "types/user";
export type InitialState = {
  currentUser: UserProfile | null;
  token: string | null;
  status: "FULFILLED" | "ERROR" | "PENDING" | "IDLE";
  error: string | null;
};

export type res = {
  currentUser: UserProfile;
  token: string;
};
