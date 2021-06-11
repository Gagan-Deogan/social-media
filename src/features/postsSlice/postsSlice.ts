import axios from "axios";
import { FetchError } from "types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialState, res } from "./types";
import { Post } from "types";
const initialState: InitialState = {
  posts: [],
  status: "IDLE",
  error: "",
};

export const fetchPosts = createAsyncThunk<
  Post[],
  undefined,
  { rejectValue: FetchError }
>("posts/fetch", async (_, thunkApi) => {
  const res = await axios.get("/posts");
  if (res.status === 200) {
    const data: Post[] = res.data.data;
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
      if (exsitingPost) {
        exsitingPost.likes++;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
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

export const { likePost } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
