import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialState, res } from "./types";
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
  const res = await axios.post("http://localhost:8080/users/login", {
    email,
    password,
  });

  if (res.status !== 200) {
    return thunkApi.rejectWithValue({
      error: "Failed",
    });
  }
  const data: res = res.data.data;
  return data;
});

export const initializeUser = createAsyncThunk<
  res,
  undefined,
  { rejectValue: FetchError }
>("user/InitialUser", async (_, thunkApi) => {
  const res = await axios.get("http://localhost:8080/users/self");

  if (res.status !== 200) {
    return thunkApi.rejectWithValue({
      error: "Failed",
    });
  }
  const data: res = res.data.data;
  return data;
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
      state.status = "IDLE";
    });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
