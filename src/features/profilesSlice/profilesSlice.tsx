import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserProfile, ProfilesInitialState } from "./profilesSlice.types";
import { ServerError, User } from "types";
const initialState: ProfilesInitialState = {
  profiles: {},
  status: "IDLE",
};

export const getProfileByUsername = createAsyncThunk<
  UserProfile,
  { username: string },
  { rejectValue: ServerError }
>("profiles/username", async ({ username }, thunkApi) => {
  const res: { success: boolean; data: UserProfile } = await axios.get(
    `/profiles/${username}`
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
  { rejectValue: ServerError }
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
  { rejectValue: ServerError }
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

export const getUserFollower = createAsyncThunk<
  UserProfile,
  { username: string },
  { rejectValue: ServerError }
>("profile/followers", async ({ username }, thunkApi) => {
  const res: {
    success: boolean;
    data: UserProfile;
  } = await axios.get(`/profiles/${username}/followers`);
  if (res.success) {
    return res.data;
  }
  return thunkApi.rejectWithValue({
    error: "Failed",
  });
});

export const getUserFollowing = createAsyncThunk<
  User[],
  { username: string },
  { rejectValue: ServerError }
>("profile/following", async ({ username }, thunkApi) => {
  const res: {
    success: boolean;
    data: User[];
  } = await axios.get(`/profiles/${username}/following`);
  if (res.success) {
    return res.data;
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
      const exsitingPost = state.profiles[username].posts?.find(
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
    });
    builder.addCase(updateProfile.rejected, (state) => {
      state.status = "ERROR";
    });

    builder.addCase(getUserFollower.pending, (state) => {
      state.status = "PENDING";
    });
    builder.addCase(getUserFollower.fulfilled, (state, { meta, payload }) => {
      const username = meta.arg.username;
      if (username in state.profiles) {
        state.profiles[username].followers = payload.followers;
      } else {
        state.profiles[username] = payload;
      }
      state.status = "FULFILLED";
    });
    builder.addCase(getUserFollower.rejected, (state) => {
      state.status = "ERROR";
    });

    builder.addCase(getUserFollowing.pending, (state) => {
      state.status = "PENDING";
    });
    builder.addCase(getUserFollowing.fulfilled, (state, { meta, payload }) => {
      state.profiles[meta.arg.username].following = payload;
      state.status = "FULFILLED";
    });
    builder.addCase(getUserFollowing.rejected, (state) => {
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
