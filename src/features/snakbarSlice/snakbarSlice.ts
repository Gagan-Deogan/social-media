import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./types";

const initialState: InitialState = {
  isShow: false,
  message: "",
  type: "SUCCESS",
};

const snakbarSlice = createSlice({
  name: "snakbar",
  initialState,
  reducers: {
    showSnakbar: (state, action) => {
      state.isShow = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideSnakbar: (state) => {
      state.isShow = false;
      state.message = "";
      state.type = "SUCCESS";
    },
  },
});

export const { showSnakbar, hideSnakbar } = snakbarSlice.actions;
export const snakbarReducer = snakbarSlice.reducer;
