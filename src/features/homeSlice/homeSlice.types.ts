import { Post } from "types";
export type GetHomePostResponse = { data: Post[]; success: boolean };
export type HomeSliceInitialState = {
  posts: Post[];
  status: "IDLE" | "PENDING" | "ERROR" | "FULFILLED";
  error: string;
};
