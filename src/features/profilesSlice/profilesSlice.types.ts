import { UserProfile } from "types";

export interface Profiles {
  [username: string]: UserProfile;
}
export type ProfilesInitialState = {
  profiles: Profiles;
  status: "IDLE" | "PENDING" | "FULFILLED" | "ERROR";
};
export type { UserProfile };
