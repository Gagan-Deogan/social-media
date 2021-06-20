import axios from "axios";

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
