import { uuid } from "utils";
import { storage } from "../firebase";
import axios from "axios";
export const createPost = async ({
  selectedImage,
  title,
}: {
  selectedImage: any;
  title: string | undefined;
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
          const res = await axios.post("/posts", {
            imageURL: imageURL ?? undefined,
            title: title ?? undefined,
          });
          if (res) {
          }
        } catch (err) {
          console.log(err);
        }
      });
  };
  const imageUniqueName = uuid() + selectedImage.name;
  console.log(imageUniqueName);
  const uploadTask = storage
    .ref(`images/${imageUniqueName}`)
    .put(selectedImage);
  uploadTask.on("state_changed", undefined, error, complete);
};
