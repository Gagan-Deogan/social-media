import { User } from "types";
export type Notification =
  | {
      _id: string;
      post: { _id: string; title?: string; imageURL?: string };
      text: string;
      notificationType: "LIKE";
      sourceUser: User;
    }
  | {
      _id: string;
      text: string;
      notificationType: "FOLLOW";
      sourceUser: User;
    };

export type NotificationsSliceState = {
  notifications: Notification[];
  status: "IDLE" | "PENDING" | "FULFILLED" | "ERROR";
};
