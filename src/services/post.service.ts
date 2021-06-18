import { uuid } from "utils";
import { storage } from "../firebase";
import axios from "axios";
export const createPost = async ({
  selectedImage,
  title,
  onCretePostComplete,
}: {
  selectedImage: any;
  title: string | undefined;
  onCretePostComplete: Function;
}) => {
  const error = (error: any) => {
    console.log(error);
  };

  const complete = () => {
    storage
      .ref("images")
      .child(imageUniqueName)
      .getDownloadURL()
      .then(async (imageURL) => {
        try {
          const res: { success: boolean; data: string } = await axios.post(
            "/posts",
            {
              imageURL: imageURL ?? undefined,
              title: title ?? undefined,
            }
          );
          if (res.success) {
            onCretePostComplete(res.data);
          }
        } catch (err) {
          console.log(err);
        }
      });
  };
  const imageUniqueName = uuid() + selectedImage.name;
  const uploadTask = storage
    .ref(`images/${imageUniqueName}`)
    .put(selectedImage);
  uploadTask.on("state_changed", undefined, error, complete);
};

export const updatePostLike = async ({
  postId,
  likeToogle,
}: {
  postId: string;
  likeToogle: Function;
}) => {
  try {
    const res: { success: boolean; data: string } = await axios.put(
      `/posts/${postId}`
    );
    if (!res.success) {
      likeToogle();
    }
  } catch (err) {
    likeToogle();
    console.log(err);
  }
  return Promise.resolve();
};
