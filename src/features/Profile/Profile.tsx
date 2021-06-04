import "./profile.css";
import { Avatar } from "components/Avatar";
import { NavLink } from "react-router-dom";
import { Posts } from "features/Posts";
export const Profile = () => {
  return (
    <>
      <section className="border-right">
        <div className="border-bottom position-sticky top-0 bg-white padding-8 padding-l-16">
          <h2 className="bold">Profile</h2>
        </div>
        <header className="header-image-container position-relative">
          <img
            src="https://pbs.twimg.com/profile_banners/1231253505446465536/1621833366/1500x500"
            alt=""
            className="position-absolute right w12"
          />
        </header>
        <div className="row align-center justify-end margin-t-32 margin-l-16 margin-r-16 position-relative">
          <Avatar
            image="https://pbs.twimg.com/profile_images/1366304827169329152/fFuZfSm2_400x400.jpg"
            name="gagan "
            className="avatar-lg position-absolute bottom-0 left-0"
          />
          <button className="sm-btn-pry border-rounded">Edit Profile</button>
        </div>
        <div className="margin-l-16">
          <h3 className="bold">Gagandeep Singh</h3>
          <h5 className="grey-color">@Gagandeogan</h5>
          <p className="font-md w10">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequatur natus sapiente voluptates ratione. Nostrum placeat
            voluptas doloremque est, sapiente ipsa nisi dolorem voluptatum
            aliquid debitis, quae facere maiores, repellendus libero.
          </p>
        </div>
        <div className="row margin-l-16 margin-t-8">
          <NavLink to="followes" className="btn-link border-rounded">
            <span className="bold margin-r-8">87</span>
            Followers
          </NavLink>
          <NavLink
            to="following"
            className="margin-l-8 btn-link border-rounded">
            <span className="bold margin-r-8">87</span>
            Following
          </NavLink>
        </div>
        <div className="border-top margin-t-16">
          <Posts />
        </div>
      </section>
    </>
  );
};
