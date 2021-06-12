import { Post } from "types";

export type InitialState = {
  posts: Post[];
  status: "IDLE" | "PENDING" | "ERROR" | "FULFILLED";
  error: string;
};
