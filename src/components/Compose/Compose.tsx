import { useRef, useState, useEffect } from "react";
import { Post } from "types";
import { ImageIcon, SendIcon } from "assests/icons";
import { Avatar } from "components/Avatar";
import { createPost } from "services";
import { useAppDispatch } from "app/hooks";
import { addNewPost } from "features/homeSlice";
export const Compose = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const imagePreview = useRef<any>();
  const [title, setTitle] = useState<string>();
  const [selectedImage, setSelectedImage] = useState();
  const appDispatch = useAppDispatch();
  const handleBrowerOpen = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
      if (imagePreview.current)
        imagePreview.current.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const onCretePostComplete = (post: Post | undefined) => {
    if (post) {
      setSelectedImage(undefined);
      setTitle("");
      appDispatch(addNewPost(post));
    }
  };

  const handelUpload = () => {
    if (title || selectedImage) {
      createPost({ selectedImage, title, onCretePostComplete });
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 0 + "px";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [title]);

  return (
    <div className="w12 border-bottom padding-16 row">
      <Avatar
        image={
          "https://pbs.twimg.com/profile_images/1366304827169329152/fFuZfSm2_400x400.jpg"
        }
        name="Gagandeep"
      />
      <div className="w12 margin-l-16 margin-r-16">
        <div>
          <textarea
            className="w12 padding-8"
            placeholder="What's happening?"
            value={title}
            ref={ref}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div
            className={`post-image-container w12 bor-rad-12 margin-t-8 margin-b-8 ${
              !selectedImage && "dis-hide"
            }`}>
            <img className="bor-rad-12" ref={imagePreview} alt="upload" />
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
            onChange={(e) => handleFileChange(e)}
          />
          <button className="btn-link border-rounded" onClick={handelUpload}>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
