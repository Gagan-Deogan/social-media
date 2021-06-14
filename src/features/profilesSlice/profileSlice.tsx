import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserProfile, ProfilesInitialState } from "./profileSlice.types";
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
      if (payload) {
        state.error = payload.error;
      }
    });
  },
});
export const { setStatusIdle } = profilesSlice.actions;
export const profilesReducer = profilesSlice.reducer;
