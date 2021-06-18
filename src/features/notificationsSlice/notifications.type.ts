import { User } from "types";

export type Notification = {
  _id: string;
  postId?: string;
  text: string;
  NotificationsType: "FOLLOW" | "LIKE";
  sourceUser: User;
};
export type NotificationsSliceState = {
  notifications: Notification[];
  status: "IDLE" | "PENDING" | "FULFILLED" | "ERROR";
};
