import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CurrentUser } from "types/user";
type InitialState = {
  currentUser: CurrentUser | null;
  token: string | null;
  status: "FULFILLED" | "ERROR" | "PENDING" | "IDLE";
  error: string | null;
};
type FetchError = {
  error: string;
};
type response = {
  currentUser: CurrentUser;
  token: string;
};

const initialState: InitialState = {
  currentUser: null,
  status: "IDLE",
  token: null,
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
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
