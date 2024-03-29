import { ServerError } from "types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationsSliceState, Notification } from "./notifications.type";
import axios from "axios";
const initialState: NotificationsSliceState = {
  notifications: [],
  status: "IDLE",
};

export const getNotifications = createAsyncThunk<
  Notification[],
  undefined,
  { rejectValue: ServerError }
>("/fetch/notifications", async (_, thunkApi) => {
  const res: { success: boolean; data: Notification[] } = await axios.get(
    "/notifications"
  );
  if (res.success) {
    const data: Notification[] = res.data;
    return data;
  }
  return thunkApi.rejectWithValue({
    error: "Failed",
  });
});

const notifiactionSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    refreshNotification: (state) => {
      state.status = "IDLE";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotifications.pending, (state) => {
      state.status = "PENDING";
    });
    builder.addCase(getNotifications.fulfilled, (state, { payload }) => {
      state.notifications = payload;
      state.status = "FULFILLED";
    });
    builder.addCase(getNotifications.rejected, (state) => {
      state.status = "ERROR";
    });
  },
});
export const { refreshNotification } = notifiactionSlice.actions;
export const notificationsReducer = notifiactionSlice.reducer;
