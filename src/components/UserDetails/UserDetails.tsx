import { useState } from "react";
import { Avatar } from "components/Avatar";
import { UserProfile } from "types";
import { NavLink } from "react-router-dom";
import { PostCard } from "components/PostCard";
import { Modal } from "components/Modal";
import { updatePostLike } from "services";
import { profilePostLikeToogle, updateFollowing } from "features/profilesSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { EditProfile } from "./EditProfile";
import { debounce } from "utils";
export const UserDetails = ({ userProfile }: { userProfile: UserProfile }) => {
  const [toogleModel, setToogleModel] = useState<boolean>(false);
  const { currentUser } = useAppSelector((state) => state.auth);
  const appDispatch = useAppDispatch();
  const {
    _id,
    bio,
    fullname,
    username,
    imageURL,
    headerImageURL,
    email,
    following,
    followers,
    followersLength,
    followingLength,
    posts,
    isFollow,
  } = userProfile;

  const likeToogle = (postId: string) => {
    appDispatch(profilePostLikeToogle({ username, postId }));
  };

  const handleLike = (postId: string) => {
    likeToogle(postId);
    updatePostLike({ postId, likeToogle });
  };

  const handlefollowToogle = () => {
    appDispatch(updateFollowing({ username }));
  };

  const betterHandlefollowToogle = debounce(handlefollowToogle, 300);

  return (
    <>
      <div className="header-image-container position-relative bg-grey">
        {headerImageURL && (
          <img
            src={headerImageURL}
            alt="Header"
            className="position-absolute right w12"
          />
        )}
      </div>
      <div className="row align-center justify-end margin-t-32 margin-l-16 margin-r-16 position-relative">
        <Avatar
          image={imageURL}
          name="user-image"
          className="avatar-lg avatar-border position-absolute bottom-0 left-0"
        />
        {isFollow && currentUser?._id !== _id && (
          <button
            className="sm-btn-pry border-rounded"
            onClick={() => betterHandlefollowToogle()}>
            UnFollow
          </button>
        )}
        {!isFollow && currentUser?._id !== _id && (
          <button
            className="sm-btn-pry-fil border-rounded"
            onClick={() => betterHandlefollowToogle()}>
            Follow
          </button>
        )}
        {currentUser?._id === _id && (
          <button
            className="sm-btn-pry border-rounded"
            onClick={() => setToogleModel(true)}>
            Edit Profile
          </button>
        )}
      </div>
      <div className="margin-l-16">
        <h3 className="bold">{fullname}</h3>
        <h5 className="grey-color">{username}</h5>
        <p className="w10">{bio}</p>
      </div>
      <div className="row margin-l-16 margin-t-8">
        <NavLink to="followes" className="btn-link border-rounded">
          <span className="bold margin-r-8">{followersLength}</span>
          Followers
        </NavLink>
        <NavLink to="following" className="margin-l-8 btn-link border-rounded">
          <span className="bold margin-r-8">{followingLength}</span>
          Following
        </NavLink>
      </div>
      <div className="border-top margin-t-16">
        {posts?.map((post) => (
          <PostCard key={post._id} post={post} handleLike={handleLike} />
        ))}
      </div>
      <Modal isOpen={toogleModel}>
        <EditProfile
          fullname={fullname}
          bio={bio}
          headerImageURL={headerImageURL}
          imageURL={imageURL}
          handleClose={setToogleModel}></EditProfile>
      </Modal>
    </>
  );
};
