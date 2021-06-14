import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialState, res } from "./types";
import { UserProfile } from "types/user";

import { FetchError } from "types";
const initialState: InitialState = {
  currentUser: null,
  status: "IDLE",
  token: localStorage?.getItem("token"),
  error: "",
};

export const loginUser = createAsyncThunk<
  res,
  { email: string; password: string },
  { rejectValue: FetchError }
>("user/loginUser", async ({ email, password }, thunkApi) => {
  const res: { success: boolean; data: res } = await axios.post(
    "/users/login",
    {
      email,
      password,
    }
  );

  if (res.success) {
    const data: res = res.data;
    return data;
  }
  return thunkApi.rejectWithValue({
    error: "Failed",
  });
});

export const initializeUser = createAsyncThunk<
  res,
  undefined,
  { rejectValue: FetchError }
>("user/InitialUser", async (_, thunkApi) => {
  const res: { success: boolean; data: res } = await axios.get("/users/self");

  if (res.success) {
    const data: res = res.data;
    return data;
  }
  return thunkApi.rejectWithValue({
    error: "Failed",
  });
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.status = "IDLE";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "PENDING";
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.currentUser = payload.currentUser;
      state.status = "FULFILLED";
      state.token = payload.token;
      localStorage.setItem("token", payload.token);
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload.error;
      state.status = "IDLE";
    });

    builder.addCase(initializeUser.pending, (state) => {
      state.status = "PENDING";
    });
    builder.addCase(initializeUser.fulfilled, (state, { payload }) => {
      state.currentUser = payload.currentUser;
      state.status = "FULFILLED";
    });
    builder.addCase(initializeUser.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload.error;
      }
    });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
