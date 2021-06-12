import axios from "axios";
import { FetchError } from "types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialState } from "./types";
import { Post } from "types";
const initialState: InitialState = {
  posts: [],
  status: "IDLE",
  error: "",
};
type GetPostResponse = { data: Post[]; success: boolean };
export const fetchPosts = createAsyncThunk<
  Post[],
  undefined,
  { rejectValue: FetchError }
>("posts/fetch", async (_, thunkApi) => {
  const res: GetPostResponse = await axios.get("/posts");
  if (res.success) {
    const data: Post[] = res.data;
    return data;
  }
  return thunkApi.rejectWithValue({
    error: "Failed",
  });
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    likePost: (state, action) => {
      const { postId } = action.payload;
      const exsitingPost = state.posts.find((post) => post._id === postId);
      if (exsitingPost && exsitingPost.currentUserLike) {
        exsitingPost.currentUserLike = false;
        exsitingPost.likes--;
      } else if (exsitingPost && !exsitingPost.currentUserLike) {
        exsitingPost.currentUserLike = true;
        exsitingPost.likes++;
      }
    },
    addNewPost: (state, action) => {
      const post: Post = action.payload;
      state.posts.unshift(post);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, { payload }) => {
      state.status = "PENDING";
    });
    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      state.posts = payload;
      state.status = "FULFILLED";
    });
    builder.addCase(fetchPosts.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload.error;
      }
      state.status = "ERROR";
    });
  },
});

export const { likePost, addNewPost } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
