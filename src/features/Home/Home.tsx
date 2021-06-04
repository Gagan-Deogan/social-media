import { Posts } from "features/Posts";
export const Home = () => {
  return (
    <>
      <section className="border-right">
        <div className="border-bottom position-sticky top-0 bg-white padding-8 padding-l-16">
          <h2 className="bold">Home</h2>
        </div>
        <Posts />
      </section>
    </>
  );
};
