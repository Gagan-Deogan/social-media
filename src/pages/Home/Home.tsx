import { useEffect } from "react";
import { useAppSelector } from "app/hooks";
import { Post } from "components/Post";
import { Compose } from "components/Compose";
import { useAppDispatch } from "app/hooks";
import { fetchPosts } from "features/postsSlice";
export const Home = () => {
  const { posts, status, error } = useAppSelector((state) => state.posts);
  const appDispatch = useAppDispatch();
  useEffect(() => {
    if (status === "IDLE") {
      appDispatch(fetchPosts());
    }
  }, [status]);
  return (
    <>
      <section className="border-right">
        <div className="border-bottom position-sticky top-0 bg-white padding-8 padding-l-16">
          <h2 className="bold">Home</h2>
        </div>
        <Compose />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </section>
    </>
  );
};
