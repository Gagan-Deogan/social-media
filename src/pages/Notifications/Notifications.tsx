import { Avatar } from "components/Avatar";

export const Notifications = () => {
  return (
    <>
      <section className="border-right">
        <div className="border-bottom position-sticky top-0 bg-white padding-8 padding-l-16">
          <h2 className="bold">Notifications</h2>
        </div>
        <article className="border-bottom padding-16 row align-center">
          <Avatar
            image="https://pbs.twimg.com/profile_images/1366304827169329152/fFuZfSm2_400x400.jpg"
            name="Gagandeep"
          />
          <h5 className="margin-l-16">Gagandeep followed you</h5>
        </article>
        <article className="border-bottom padding-16 row align-center">
          <Avatar
            image="https://pbs.twimg.com/profile_images/1366304827169329152/fFuZfSm2_400x400.jpg"
            name="Gagandeep"
          />
          <h5 className="margin-l-16">Gagandeep Likes Post</h5>
        </article>
      </section>
    </>
  );
};