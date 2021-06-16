import { Avatar } from "components/Avatar";
import { UserProfile } from "types";
import { NavLink } from "react-router-dom";
import { PostCard } from "components/PostCard";
import { updatePostLike } from "services";
import { profilePostLikeToogle } from "features/profilesSlice";
import { useAppDispatch } from "app/hooks";

export const UserDetails = ({ userProfile }: { userProfile: UserProfile }) => {
  const appDispatch = useAppDispatch();
  const {
    bio,
    fullname,
    username,
    imageURL,
    headerImage,
    email,
    following,
    followers,
    posts,
  } = userProfile;
  const likeToogle = (postId: string) => {
    appDispatch(profilePostLikeToogle({ username, postId }));
  };
  const handleLike = (postId: string) => {
    likeToogle(postId);
    updatePostLike({ postId, likeToogle });
  };
  return (
    <>
      <div className="header-image-container position-relative bg-grey">
        {headerImage && (
          <img
            src="https://pbs.twimg.com/profile_banners/1231253505446465536/1621833366/1500x500"
            alt=""
            className="position-absolute right w12"
          />
        )}
      </div>
      <div className="row align-center justify-end margin-t-32 margin-l-16 margin-r-16 position-relative">
        <Avatar
          image={imageURL}
          name="gagan"
          className="avatar-lg avatar-border position-absolute  bottom-0 left-0"
        />
        <button className="sm-btn-pry border-rounded">Edit Profile</button>
      </div>
      <div className="margin-l-16">
        <h3 className="bold">{fullname}</h3>
        <h5 className="grey-color">{username}</h5>
        <p className="font-md w10">{bio}</p>
      </div>
      <div className="row margin-l-16 margin-t-8">
        <NavLink to="followes" className="btn-link border-rounded">
          <span className="bold margin-r-8">{followers.length}</span>
          Followers
        </NavLink>
        <NavLink to="following" className="margin-l-8 btn-link border-rounded">
          <span className="bold margin-r-8">{following.length}</span>
          Following
        </NavLink>
      </div>
      <div className="border-top margin-t-16">
        {posts?.map((post) => (
          <PostCard key={post._id} post={post} handleLike={handleLike} />
        ))}
      </div>
    </>
  );
};
