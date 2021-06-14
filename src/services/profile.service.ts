import axios from "axios";
import { Post, UserProfile } from "types";
type FetchProfile = {
  success: boolean;
  data: { posts: Post[]; userDetails: UserProfile };
};

export const getProfileDetails = async (username: string) => {
  try {
    const res: FetchProfile = await axios.get(`/profiles/${username}`);
    if (res.success) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
};
