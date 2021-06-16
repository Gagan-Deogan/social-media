import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ExploreSliceInitialState, ExploreResponese } from "./searchSlice.type";
import { FetchError, User } from "types";
import axios from "axios";
const initialState: ExploreSliceInitialState = {
  users: [],
  recents: [],
  status: "IDLE",
  error: null,
};

export const searchByUsername = createAsyncThunk<
  User[],
  { search: string },
  { rejectValue: FetchError }
>("explore/seacrhUsers", async ({ search }, thunkApi) => {
  const res: ExploreResponese = await axios.get(`/search/${search}`);
  if (res.success) {
    const data: User[] = res.data;
    return data;
  }
  return thunkApi.rejectWithValue({
    error: "Failed",
  });
});

const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    setStatusIdle: (state) => {
      state.status = "IDLE";
      state.users = [];
    },
    removeFromRecent: (state, action: PayloadAction<{ username: string }>) => {
      const { username } = action.payload;
      state.recents = state.recents.filter(
        (user) => user.username !== username
      );
    },
    addToRecent: (state, action: PayloadAction<{ newUser: User }>) => {
      const { newUser } = action.payload;
      state.recents = state.recents.filter(
        (user) => user.username !== newUser.username
      );
      state.recents.unshift(newUser);
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchByUsername.pending, (state) => {
      state.status = "PENDING";
    });
    builder.addCase(searchByUsername.fulfilled, (state, { payload }) => {
      state.status = "FULFILLED";
      state.users = payload;
    });
    builder.addCase(searchByUsername.rejected, (state, { payload }) => {
      state.status = "ERROR";
      state.error = "failed";
    });
  },
});
export const {
  removeFromRecent,
  addToRecent,
  setStatusIdle,
} = exploreSlice.actions;
export const exploreReducer = exploreSlice.reducer;
