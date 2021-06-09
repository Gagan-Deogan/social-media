import { useAppSelector } from "app/hooks";
import { Post } from "components/Post";
export const Home = () => {
  const { posts } = useAppSelector((state) => state.posts);
  return (
    <>
      <section className="border-right">
        <div className="border-bottom position-sticky top-0 bg-white padding-8 padding-l-16">
          <h2 className="bold">Home</h2>
        </div>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </section>
    </>
  );
};
