import React, { useRef, useState, useEffect } from "react";
import { ImageIcon, SendIcon } from "assests/icons";
import { Avatar } from "common-components/Avatar";
import { Spinner } from "common-components/Spinner";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { showSnakbar } from "features/snakbarSlice";
import {
  createImagePreviewSrc,
  isValidImage,
  UploadImageToBucket,
} from "utils";
import { uploadNewPost } from "features/homeSlice";

export const Compose = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const ref = useRef<HTMLTextAreaElement>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "IDLE" | "PENDING" | "ERROR"
  >("IDLE");
  const imagePreview = selectedImage && createImagePreviewSrc(selectedImage);
  const appDispatch = useAppDispatch();

  const hnadleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      const sentence = e.target.value;
      if (sentence.length < 250) setTitle(sentence);
    } else {
      setTitle(null);
    }
  };

  const handleBrowerOpen = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.files &&
      !!e.target.files[0] &&
      isValidImage(e.target.files[0].name)
    ) {
      setSelectedImage(e.target.files[0]);
    } else {
      appDispatch(showSnakbar({ type: "ERROR", message: "Invalid Image" }));
    }
  };
  const handleUploadImage = async (image: File | null) => {
    if (image) {
      const imageURL = await UploadImageToBucket(image);
      if (imageURL) return imageURL;
    }
    return null;
  };

  const handleNewPost = async () => {
    if (title || selectedImage) {
      setUploadStatus("PENDING");
      const imageURL = await handleUploadImage(selectedImage);
      const { type } = await appDispatch(uploadNewPost({ imageURL, title }));
      setUploadStatus("IDLE");
      if (type === "posts/upload/fulfilled") {
        setSelectedImage(null);
        setTitle(null);
      }
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 0 + "px";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [title]);

  return (
    <>
      <div className="w12 border-bottom padding-16 row">
        {currentUser && (
          <Avatar image={currentUser.imageURL} name="Gagandeep" />
        )}
        <div className="w12 margin-l-16 margin-r-16">
          <div>
            <textarea
              className="w12 padding-8"
              placeholder="What's happening?"
              value={title ?? ""}
              ref={ref}
              onChange={hnadleTitleChange}
            />
            <div
              className={`post-image-container w12 bor-rad-12 margin-t-8 margin-b-8 ${
                !selectedImage && "dis-hide"
              }`}>
              {imagePreview && (
                <img className="bor-rad-12" src={imagePreview} alt="upload" />
              )}
            </div>
          </div>
          <div className="row justify-between">
            <button
              className="btn-link border-rounded"
              onClick={handleBrowerOpen}>
              <ImageIcon />
            </button>
            <input
              type="file"
              className="dis-hide"
              accept="image/x-png,image/gif,image/jpeg"
              ref={hiddenFileInput}
              onChange={handleFileChange}
            />
            {uploadStatus === "PENDING" && (
              <button className="btn-link border-rounded">
                <Spinner />
              </button>
            )}
            {uploadStatus === "IDLE" && (
              <button
                className="btn-link border-rounded"
                onClick={handleNewPost}>
                <SendIcon />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
