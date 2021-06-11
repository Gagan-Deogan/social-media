type UserType = {
  name: string;
  username: string;
  imageURL: string;
  Bio: string;
};
export type CurrentUser = {
  email: string;
  name: string;
  username: string;
  imageURL: string;
  headerImage: string;
  Bio: string;
  following: UserType[];
  followers: UserType[];
};
