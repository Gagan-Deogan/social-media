import { Post } from "./post";

type UserType = {
  fullname: string;
  username: string;
  imageURL: string;
  Bio: string;
};
export type UserProfile = {
  email: string;
  fullname: string;
  username: string;
  imageURL: string;
  headerImage: string;
  bio: string;
  following: UserType[];
  followers: UserType[];
  posts: Post[];
};
