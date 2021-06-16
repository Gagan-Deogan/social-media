import { useEffect } from "react";
import { useAppSelector } from "app/hooks";
import { PostCard } from "components/PostCard";
import { Compose } from "components/Compose";
import { useAppDispatch } from "app/hooks";
import { getHomePost, homePostLikeToogle } from "features/homeSlice";
import { updatePostLike } from "services";
export const Home = () => {
  const { posts, status, error } = useAppSelector((state) => state.posts);
  const appDispatch = useAppDispatch();
  useEffect(() => {
    if (status === "IDLE") {
      appDispatch(getHomePost());
    }
  }, [status]);

  const likeToogle = (postId: string) => {
    appDispatch(homePostLikeToogle({ postId }));
  };
  const handleLike = (postId: string) => {
    likeToogle(postId);
    updatePostLike({ postId, likeToogle });
  };

  return (
    <>
      <section className="border-right">
        <div className="border-bottom position-sticky top-0 bg-white padding-8 padding-l-16">
          <h2 className="bold">Home</h2>
        </div>
        <Compose />
        {posts.map((post) => (
          <PostCard key={post._id} post={post} handleLike={handleLike} />
        ))}
      </section>
    </>
  );
};
