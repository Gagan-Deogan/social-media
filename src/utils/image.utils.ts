import { storageRef } from "../firebase";
import { uuid } from "utils";
const metadata = {
  contentType: "image/jpeg",
};
export const createImagePreviewSrc = (image: File) => {
  return URL.createObjectURL(image);
};
export const isValidImage = (imageName: string) => {
  const extension = imageName.split(".").pop() || "";
  return ["jpg", "jpeg"].includes(extension);
};

export const UploadImageToBucket = async (
  image: File
): Promise<string | undefined> => {
  try {
    const imageUniqueName = uuid() + image.name;
    const fileRef = storageRef.child(imageUniqueName);
    const uploadTaskSnapshot = await fileRef.put(image, metadata);
    const downloadURL: string = await uploadTaskSnapshot.ref.getDownloadURL();
    return downloadURL;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
