import React, { useReducer, useRef } from "react";
import { CancelIcon, CameraIcon } from "assests/icons";
import { EditProfileProps, EditReducerInitialState } from "./profile.types";
import { Avatar } from "components/Avatar";
import { reducer } from "./editProfile.reducer";
import { useAppDispatch } from "app/hooks";
import { Spinner } from "components/Spinner";
import { updateProfile } from "features/profilesSlice";
import { UploadImageToBucket } from "./profiles.service";
export const EditProfile = ({
  fullname,
  bio,
  imageURL,
  headerImageURL,
  handleClose,
}: EditProfileProps) => {
  const appDispatch = useAppDispatch();
  const profileImageUploadRef = useRef<HTMLInputElement>(null);
  const headerImageUploadRef = useRef<HTMLInputElement>(null);
  const initialState: EditReducerInitialState = {
    newFullname: fullname,
    newBio: bio ?? "",
    newProfileImage: imageURL,
    newHeaderImage: headerImageURL,
    status: "IDLE",
  };

  const [
    { newFullname, newBio, newProfileImage, newHeaderImage, status },
    dispatch,
  ] = useReducer(reducer, initialState);

  const profileImagePreview =
    typeof newProfileImage === "string"
      ? newProfileImage
      : newProfileImage && URL.createObjectURL(newProfileImage);
  const headerImagePreview =
    typeof newHeaderImage === "string"
      ? newHeaderImage
      : newHeaderImage && URL.createObjectURL(newHeaderImage);

  const handleBrowerHeaderImage = () => {
    if (headerImageUploadRef.current) {
      headerImageUploadRef.current.click();
    }
  };

  const handleBrowerProfileImage = () => {
    if (profileImageUploadRef.current) {
      profileImageUploadRef.current.click();
    }
  };

  const handleHeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && !!e.target.files[0]) {
      dispatch({ type: "SET_HEADER_IMAGE", payload: e.target.files[0] });
    }
  };

  const handleprofileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && !!e.target.files[0]) {
      dispatch({ type: "SET_PROFILE_IMAGE", payload: e.target.files[0] });
    }
  };

  const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = e.target.value;
    if (payload.length <= 45) {
      dispatch({ type: "SET_FULLNAME", payload });
    }
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = e.target.value;
    if (payload.length <= 160) {
      dispatch({ type: "SET_BIO", payload });
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (newFullname && newBio && newProfileImage && newHeaderImage) {
      dispatch({ type: "SET_STATUS", payload: "PENDING" });
      const newImageUrl = await handleUploadImage(newProfileImage);
      const newHeaderImageUrl = await handleUploadImage(newHeaderImage);
      if (newImageUrl && newHeaderImageUrl)
        appDispatch(
          updateProfile({ newFullname, newBio, newImageUrl, newHeaderImageUrl })
        );
    }
  };
  const handleUploadImage = async (image: File | string) => {
    if (typeof image === "object") {
      const res = await UploadImageToBucket(image);
      if (!res) {
        dispatch({ type: "SET_STATUS", payload: "ERROR" });
      } else {
        return res;
      }
    } else if (typeof image === typeof "") {
      return image;
    }
  };

  const handleRetry = () => {
    dispatch({ type: "SET_STATUS", payload: "IDLE" });
  };

  return (
    <>
      <div className="bg-white sm-w10 md-w6 w5 bor-rad-12 padding-16 box-shd">
        {status === "IDLE" && (
          <>
            <div className="row justify-between align-center margin-b-8">
              <h3 className="bold ">Edit Profile</h3>
              <button
                className="btn-link border-rounded"
                onClick={() => handleClose(false)}>
                <CancelIcon />
              </button>
            </div>
            <section className="column">
              <div className="header-image-container position-relative bg-grey">
                {headerImagePreview && (
                  <img
                    src={headerImagePreview}
                    alt=""
                    className="position-absolute right w12"
                  />
                )}
                <div className="overlap-gray row justify-center align-center">
                  <button
                    className="btn-link border-rounded"
                    onClick={handleBrowerHeaderImage}>
                    <CameraIcon />
                  </button>
                </div>
              </div>
              <input
                type="file"
                name="name"
                className="hide"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={handleHeaderImageChange}
                ref={headerImageUploadRef}
              />
              <div className="row justify-start align-center border position-relative margin-b-64">
                <Avatar
                  image={profileImagePreview}
                  name="user-image"
                  className="avatar-lg avatar-border position-absolute z-index-10 "
                  children={
                    <div>
                      <button
                        className="badge btn-icon position-absolute top-0 border-none"
                        onClick={handleBrowerProfileImage}>
                        <CameraIcon />
                      </button>
                    </div>
                  }
                />
              </div>
              <input
                type="file"
                name="profile-image"
                className="hide"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={handleprofileImageChange}
                ref={profileImageUploadRef}
              />
            </section>
            <section className="column margin-b-16">
              <label htmlFor="fullname" className="margin-b-8">
                <h4>Fullname</h4>
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                value={newFullname}
                onChange={handleFullnameChange}
              />
              <h6 className="font-xs">{newFullname.length ?? 0}/45</h6>
            </section>
            <section className="column margin-b-16">
              <label htmlFor="name" className="margin-b-8">
                <h4>Bio</h4>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={newBio}
                onChange={handleBioChange}
              />
              <h6 className="font-xs">{newBio.length ?? 0}/160</h6>
            </section>
            <section className="row justify-end">
              <button
                className="sm-btn-pry-fil border-rounded"
                onClick={handleSubmit}>
                Save
              </button>
            </section>
          </>
        )}
        {status === "PENDING" && <Spinner />}
        {status === "ERROR" && (
          <>
            <h3>Something went worng,</h3>
            <p>Please try Again Later</p>
            <div className="row justify-end align-end">
              <button
                className="sm-btn-pry-fil margin-t-32"
                onClick={handleRetry}>
                Retry
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
