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
    return res.data;
  }
  return thunkApi.rejectWithValue({
    error: "Failed",
  });
});

export const updateFollowing = createAsyncThunk<
  string,
  { username: string },
  { rejectValue: FetchError }
>("profiles/updateFollowing", async ({ username }, thunkApi) => {
  const res: {
    success: boolean;
    data: string;
  } = await axios.put("/profiles/follow", { username });
  if (res.success) {
    return res.data;
  }
  return thunkApi.rejectWithValue({
    error: "Failed",
  });
});

export const updateProfile = createAsyncThunk<
  UserProfile,
  {
    newFullname: string;
    newBio: string;
    newImageUrl: string;
    newHeaderImageUrl: string;
  },
  { rejectValue: FetchError }
>(
  "profiles/editProfile",
  async ({ newFullname, newBio, newImageUrl, newHeaderImageUrl }, thunkApi) => {
    const res: {
      success: boolean;
      data: UserProfile;
    } = await axios.put("profiles/edit-profile", {
      newFullname,
      newBio,
      newImageUrl,
      newHeaderImageUrl,
    });
    if (res.success) {
      return res.data;
    }
    return thunkApi.rejectWithValue({
      error: "Failed",
    });
  }
);

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
    builder.addCase(getProfileByUsername.rejected, (state) => {
      state.status = "ERROR";
    });

    builder.addCase(updateFollowing.pending, (state, { meta }) => {
      const { username } = meta.arg;
      state.profiles[username].isFollow = !state.profiles[username].isFollow;
      if (state.profiles[username].isFollow) {
        state.profiles[username].followersLength =
          state.profiles[username].followersLength + 1;
      } else {
        state.profiles[username].followersLength =
          state.profiles[username].followersLength - 1;
      }
    });
    builder.addCase(updateFollowing.rejected, (state, { meta }) => {
      const { username } = meta.arg;
      state.profiles[username].isFollow = !state.profiles[username].isFollow;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.status = "PENDING";
    });
    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      state.profiles[payload.username] = payload;
      state.status = "FULFILLED";
      state.error = null;
    });
    builder.addCase(updateProfile.rejected, (state) => {
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
