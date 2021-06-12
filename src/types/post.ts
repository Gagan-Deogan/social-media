export type createdBy = {
  _id: string;
  fullname: string;
  username: string;
  imageURL: string;
};

export type Post = {
  _id: string;
  createdBy: createdBy;
  likes: number;
  imageURL?: string;
  title?: string;
  currentUserLike: boolean;
};
