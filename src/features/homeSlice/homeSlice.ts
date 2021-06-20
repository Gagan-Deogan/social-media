import axios from "axios";
import { FetchError } from "types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { HomeSliceInitialState, GetHomePostResponse } from "./homeSlice.types";
import { Post } from "types";
const initialState: HomeSliceInitialState = {
  posts: [],
  status: "IDLE",
  error: "",
};

export const getHomePost = createAsyncThunk<
  Post[],
  undefined,
  { rejectValue: FetchError }
>("home/fetch", async (_, thunkApi) => {
  const res: GetHomePostResponse = await axios.get("/posts");
  if (res.success) {
    const data: Post[] = res.data;
    return data;
  }
  return thunkApi.rejectWithValue({
    error: "Failed",
  });
});

export const uploadNewPost = createAsyncThunk<
  Post,
  { imageURL: string | null; title: string | null },
  { rejectValue: FetchError }
>("posts/upload", async ({ imageURL, title }, thunkApi) => {
  const res: {
    data: Post;
    success: boolean;
  } = await axios.post("/posts", { imageURL, title });
  if (res.success) {
    const data: Post = res.data;
    return data;
  }
  return thunkApi.rejectWithValue({
    error: "Failed",
  });
});

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    homePostLikeToogle: (state, action: PayloadAction<{ postId: string }>) => {
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
    addNewPost: (state: HomeSliceInitialState, action: PayloadAction<Post>) => {
      const post: Post = action.payload;
      state.posts.unshift(post);
    },
    refreshHome: (state) => {
      state.status = "IDLE";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomePost.pending, (state) => {
      state.status = "PENDING";
    });
    builder.addCase(getHomePost.fulfilled, (state, { payload }) => {
      state.posts = payload;
      state.status = "FULFILLED";
    });
    builder.addCase(getHomePost.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload.error;
      }
      state.status = "ERROR";
    });
    builder.addCase(uploadNewPost.fulfilled, (state, { payload }) => {
      const post = payload;
      state.posts.unshift(post);
    });
  },
});

export const {
  homePostLikeToogle,
  addNewPost,
  refreshHome,
} = homeSlice.actions;

export const homeReducer = homeSlice.reducer;
