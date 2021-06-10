import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialState, response, FetchError } from "./types";

const initialState: InitialState = {
  currentUser: null,
  status: "IDLE",
  token: localStorage?.getItem("token"),
  error: "",
};

export const loginUser = createAsyncThunk<
  response,
  { email: string; password: string },
  { rejectValue: FetchError }
>("user/loginUser", async ({ email, password }, thunkApi) => {
  const response = await axios.post("http://localhost:8080/users/login", {
    email,
    password,
  });

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      error: "Failed to fetch todos.",
    });
  }
  const data: response = response.data.data;
  return data;
});

export const initializeUser = createAsyncThunk<
  response,
  undefined,
  { rejectValue: FetchError }
>("user/InitialUser", async (undefined, thunkApi) => {
  const response = await axios.get("http://localhost:8080/users/self");

  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      error: "Failed to fetch todos.",
    });
  }
  const data: response = response.data.data;
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
