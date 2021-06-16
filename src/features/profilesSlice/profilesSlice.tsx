import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserProfile, ProfilesInitialState } from "./profilesSlice.types";
import { FetchError } from "types";
const initialState: ProfilesInitialState = {
  profiles: {},
  status: "IDLE",
  error: null,
};

export const getProfileByUsername = createAsyncThunk<
  UserProfile,
  { username: string },
  { rejectValue: FetchError }
>("profiles/username", async ({ username }, thunkApi) => {
  const res: { success: boolean; data: UserProfile } = await axios.get(
    `/profiles${username}`
  );
  if (res.success) {
    const data: UserProfile = res.data;
    return data;
  }
  return thunkApi.rejectWithValue({
    error: "Failed",
  });
});

const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setStatusIdle: (state) => {
      state.status = "IDLE";
    },
    setStatusFulfilled: (state) => {
      state.status = "FULFILLED";
    },
    profilePostLikeToogle: (state, { payload }) => {
      const { username, postId } = payload;
      const exsitingPost = state.profiles[username].posts.find(
        (post) => post._id === postId
      );
      if (exsitingPost && exsitingPost.currentUserLike) {
        exsitingPost.currentUserLike = false;
        exsitingPost.likes--;
      } else if (exsitingPost && !exsitingPost.currentUserLike) {
        exsitingPost.currentUserLike = true;
        exsitingPost.likes++;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileByUsername.pending, (state) => {
      state.status = "PENDING";
    });
    builder.addCase(getProfileByUsername.fulfilled, (state, { payload }) => {
      state.profiles[payload.username] = payload;
      state.status = "FULFILLED";
      state.error = null;
    });
    builder.addCase(getProfileByUsername.rejected, (state, { payload }) => {
      state.status = "ERROR";
    });
  },
});
export const {
  setStatusIdle,
  setStatusFulfilled,
  profilePostLikeToogle,
} = profilesSlice.actions;
export const profilesReducer = profilesSlice.reducer;
