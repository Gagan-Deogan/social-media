import { createSlice } from "@reduxjs/toolkit";
import { Post } from "types";
type initialState = {
  posts: Post[];
};

const initialState: initialState = {
  posts: [
    {
      _id: "123456",
      image:
        "https://i.insider.com/5f2979167924a143b86cec10?width=1000&format=jpeg&auto=webp",
      createBy: {
        name: "Gagandeep",
        username: "Gagan@123",
        userImage:
          "https://pbs.twimg.com/profile_images/1366304827169329152/fFuZfSm2_400x400.jpg",
      },
      likes: 10,
      title:
        "Just like regular JavaScript functions, extracting code to a custom hook increases complexity (especially when useEffect is involved). There are definitely situations to do it, but don't just do it to do it.",
    },
    {
      _id: "1234jkask6",
      image: "https://www.taggermedia.com/uploads/2020/07/blog-hero-57.jpg",
      createBy: {
        name: "Gagandeep",
        username: "Gagan@123",
        userImage:
          "https://pbs.twimg.com/profile_images/1366304827169329152/fFuZfSm2_400x400.jpg",
      },
      likes: 50,
      title:
        "Just like regular JavaScript functions, extracting code to a custom hook increases complexity (especially when useEffect is involved). There are definitely situations to do it, but don't just do it to do it.",
    },
  ],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    likePost: (state, action) => {
      const { postId } = action.payload;
      const exsitingPost = state.posts.find((post) => post._id === postId);
      if (exsitingPost) {
        exsitingPost.likes++;
      }
    },
  },
});

export const { likePost } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
