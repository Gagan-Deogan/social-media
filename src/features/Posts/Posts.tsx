import { TypedUseSelectorHook } from "react-redux";
import { useAppSelector } from "app/hooks";
import { Post } from "./Post";
export const Posts = () => {
  const { posts } = useAppSelector((state) => state.posts);
  return (
    <>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
};
