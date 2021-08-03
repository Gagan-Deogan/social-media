import { configureStore } from "@reduxjs/toolkit";

import { homeReducer } from "features/homeSlice";
import { authReducer } from "features/authSlice";
import { snakbarReducer } from "features/snakbarSlice";
import { profilesReducer } from "features/profilesSlice";
import { searchReducer } from "features/searchSlice";
import { notificationsReducer } from "features/notificationsSlice";
export const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
    snakbar: snakbarReducer,
    profiles: profilesReducer,
    search: searchReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
