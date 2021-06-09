type UserType = {
  name: string;
  username: string;
  displayImage: string;
  Bio: string;
};
export type CurrentUser = {
  email: string;
  name: string;
  username: string;
  displayImage: string;
  headerImage: string;
  Bio: string;
  following: UserType[];
  followers: UserType[];
};
