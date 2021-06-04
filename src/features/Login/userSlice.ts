import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CurrentUserType } from "types/user";
import axios from "axios";
type initialStateType =
  | {
      currentUser: CurrentUserType;
      token: string;
      status: "FULFILLED";
      error: null;
    }
  | {
      currentUser: null;
      token: string | null;
      status: "ERROR" | "PENDING" | "IDLE";
      error: string;
    };

// const loginUser = createAsyncThunk<Promise>(
//   "user/loginUser",
//   async (username: string, password: string) => <pro>{
//     const response = await axios.post("http://localhost:3000/loginuser", {
//       username,
//       password,
//     });
//     return response.data;
//   }
// );

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    status: "IDLE",
    token: null,
    error: "",
  },
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.currentUser = user;
      state.token = token;
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.status = "IDLE";
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "PENDING";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.status = "FULFILLED";
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "ERROR";
      state.error = action.error.message;
    },
  },
});
