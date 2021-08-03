import { RefreshIcon } from "assests/icons";
import { PostCard } from "components/PostCard";
export const PostDetails = () => {
  return (
    <>
      <section className="border-right">
        <div className="row justify-between align-center border-bottom position-sticky top-0 bg-white padding-8 padding-l-16 padding-r-16">
          <h2 className="bold">Post</h2>
          <button className="btn-link">
            <RefreshIcon />
          </button>
          {/* <PostCard  /> */}
        </div>
      </section>
    </>
  );
};
