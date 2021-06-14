import { configureStore } from "@reduxjs/toolkit";

import { postsReducer } from "features/postsSlice/";
import { userReducer } from "features/userSlice";
import { snakbarReducer } from "features/snakbarSlice";
import { profilesReducer } from "features/profilesSlice";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: userReducer,
    snakbar: snakbarReducer,
    profiles: profilesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
