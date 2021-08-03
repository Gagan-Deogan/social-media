import { useEffect } from "react";
import { RefreshIcon } from "assests/icons";
import { useAppSelector } from "app/hooks";
import { PostCard } from "components/PostCard";
import { Compose } from "./Compose";
import { useAppDispatch } from "app/hooks";
import {
  getHomePost,
  homePostLikeToogle,
  refreshHome,
} from "features/homeSlice";
import { updatePostLike } from "services";
import { debounce } from "utils";
export const Home = () => {
  const { posts, status } = useAppSelector((state) => state.home);
  const appDispatch = useAppDispatch();
  useEffect(() => {
    if (status === "IDLE") {
      appDispatch(getHomePost());
    }
  }, [status, appDispatch]);

  const likeToogle = (postId: string) => {
    appDispatch(homePostLikeToogle({ postId }));
  };
  const handleLike = (postId: string) => {
    likeToogle(postId);
    updatePostLike({ postId, likeToogle });
  };

  const handleRefresh = () => {
    appDispatch(refreshHome());
  };
  const betterHandleRefresh = debounce(handleRefresh, 500);
  return (
    <>
      <section className="border-right">
        <div className="row justify-between align-center border-bottom position-sticky top-0 bg-white padding-8 padding-l-16 padding-r-16">
          <h2 className="bold">Home</h2>
          <button className="btn-link" onClick={betterHandleRefresh}>
            <RefreshIcon />
          </button>
        </div>
        <Compose />
        {posts.map((post) => (
          <PostCard key={post._id} post={post} handleLike={handleLike} />
        ))}
      </section>
    </>
  );
};
