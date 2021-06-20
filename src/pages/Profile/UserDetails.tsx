import { useState } from "react";
import { Avatar } from "components/Avatar";
import { UserProfile } from "types";
import { useNavigate } from "react-router-dom";
import { PostCard } from "components/PostCard";
import { Modal } from "components/Modal";
import { updatePostLike } from "services";
import { profilePostLikeToogle, updateFollowing } from "features/profilesSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { EditProfile } from "./EditProfile";
import { debounce } from "utils";
import { logout } from "features/authSlice";

export const UserDetails = ({ userProfile }: { userProfile: UserProfile }) => {
  const navigate = useNavigate();
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

  const handleLogout = () => {
    appDispatch(logout());
  };

  return (
    <>
      <section className="border-right">
        <div className="border-bottom position-sticky top-0 bg-white padding-8 padding-l-16">
          <h2 className="bold">Profile</h2>
        </div>
        <div className="header-image-container position-relative bg-grey">
          {headerImageURL && (
            <img
              src={headerImageURL}
              alt="Header"
              className="position-absolute top-0 right w12"
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
            <>
              <button
                className="sm-btn-pry border-rounded"
                onClick={() => setToogleModel(true)}>
                Edit Profile
              </button>
              <button
                className="margin-l-16 sm-btn-pry border-rounded"
                onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
        <div className="margin-l-16">
          <h3 className="bold">{fullname}</h3>
          <h5 className="grey-color">{username}</h5>
          <p className="w10">{bio}</p>
        </div>
        <div className="row margin-l-16 margin-t-8">
          <button
            className="btn-link border-rounded"
            onClick={() => navigate(`followers`)}>
            <span className="bold margin-r-8">{followersLength}</span>
            Followers
          </button>
          <button
            className="margin-l-8 btn-link border-rounded"
            onClick={() => navigate(`following`)}>
            <span className="bold margin-r-8">{followingLength}</span>
            Following
          </button>
        </div>
        <div className="border-top margin-t-16">
          {posts?.map((post) => (
            <PostCard key={post._id} post={post} handleLike={handleLike} />
          ))}
          {!posts?.length && (
            <div className="text-center margin-t-64">
              <h2 className="bold">User not yet Posted</h2>
            </div>
          )}
        </div>
        <Modal isOpen={toogleModel}>
          <EditProfile
            fullname={fullname}
            bio={bio}
            headerImageURL={headerImageURL}
            imageURL={imageURL}
            handleClose={setToogleModel}></EditProfile>
        </Modal>
      </section>
    </>
  );
};
