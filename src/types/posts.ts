export type PostType = {
  _id: string;
  createBy: { name: string; userImage: string; username: string };
  likes: number;
  image?: string;
  title?: string;
};
