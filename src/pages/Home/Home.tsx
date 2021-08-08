import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { PostCard } from "common-components/PostCard";
import { GenericSection } from "common-components/GenericSection";
import { Compose } from "./Compose";
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
  const betterHandleRefresh = debounce(handleRefresh, 300);
  return (
    <>
      <GenericSection title="Home" onRefresh={betterHandleRefresh}>
        <Compose />
        {posts.map((post) => (
          <PostCard key={post._id} post={post} handleLike={handleLike} />
        ))}
      </GenericSection>
    </>
  );
};
