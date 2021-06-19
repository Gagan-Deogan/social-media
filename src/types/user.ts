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
  headerImageURL: string;
  bio?: string;
  following: User[];
  followers: User[];
  followersLength: number;
  followingLength: number;
  posts: Post[];
  isFollow: boolean;
};
