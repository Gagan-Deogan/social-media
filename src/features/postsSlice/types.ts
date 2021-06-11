import { Post } from "types";

export type InitialState = {
  posts: Post[];
  status: "IDLE" | "PENDING" | "ERROR" | "FULFILLED";
  error: string;
};
export type res = {
  data: Post[];
};
