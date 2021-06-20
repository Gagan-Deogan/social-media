import { useEffect } from "react";
import { RefreshIcon } from "assests/icons";
import { useAppSelector, useAppDispatch } from "app/hooks";
import {
  getNotifications,
  refreshNotification,
} from "features/notificationsSlice";
import { debounce } from "utils";
import { NotificationItem } from "./NotificationItem";

export const Notifications = () => {
  const { status, notifications } = useAppSelector(
    (state) => state.notifications
  );
  const appDispatch = useAppDispatch();

  useEffect(() => {
    if (status === "IDLE") {
      appDispatch(getNotifications());
    }
  }, [status, appDispatch]);
  const handleRefresh = () => {
    appDispatch(refreshNotification());
  };
  const betterHandleRefresh = debounce(handleRefresh, 500);
  return (
    <>
      <section className="border-right">
        <div className="row justify-between align-center border-bottom position-sticky top-0 bg-white padding-8 padding-l-16 padding-r-16">
          <h2 className="bold">Notifications</h2>
          <button className="btn-link" onClick={betterHandleRefresh}>
            <RefreshIcon />
          </button>
        </div>
        {notifications.map((notification) => (
          <NotificationItem notification={notification} />
        ))}
      </section>
    </>
  );
};
