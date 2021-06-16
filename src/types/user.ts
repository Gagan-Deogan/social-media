import { Post } from "./post";

export type User = {
  _id: string;
  fullname: string;
  username: string;
  imageURL: string;
};
export type UserProfile = {
  _id: string;
  email: string;
  fullname: string;
  username: string;
  imageURL: string;
  headerImage: string;
  bio: string;
  following: User[];
  followers: User[];
  posts: Post[];
};
