import { User } from "types";

export type ExploreSliceInitialState = {
  users: User[];
  recents: User[];
  status: "IDLE" | "PENDING" | "FULFILLED" | "ERROR";
  error: null | string;
};

export type ExploreResponese = { data: User[]; success: boolean };
