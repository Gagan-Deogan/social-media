import { useEffect } from "react";
import { RefreshIcon } from "assests/icons";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { GenericSection } from "common-components/GenericSection";
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
  const betterHandleRefresh = debounce(handleRefresh, 300);
  return (
    <>
      <GenericSection title="Notifications" onRefresh={betterHandleRefresh}>
        {notifications.map((notification) => (
          <NotificationItem
            notification={notification}
            key={notification._id}
          />
        ))}
      </GenericSection>
    </>
  );
};
