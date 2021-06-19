import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { Avatar } from "components/Avatar";
import { getNotifications } from "features/notificationsSlice";
import { Notification } from "features/notificationsSlice/notifications.type";
const NotificationItem = ({ notification }: { notification: Notification }) => {
  const { sourceUser, text } = notification;
  const post =
    notification.notificationType === "LIKE" ? notification.post : null;
  console.log(post);
  return (
    <article className="border-bottom padding-16 row align-center justify-between">
      <div className="row">
        <Avatar image={sourceUser.imageURL} name={sourceUser.fullname} />
        <div>
          <h5 className="margin-l-16">
            <span className="bold margin-r-4">{sourceUser.fullname}</span>{" "}
            {text}
          </h5>
          {post && (
            <p className="margin-l-16 grey-color">{post.title?.slice(0, 24)}</p>
          )}
        </div>
      </div>
      {post && post.imageURL && (
        <div className="w1">
          <img src={post.imageURL} className="responvise-img" alt="" />
        </div>
      )}
    </article>
  );
};

export const Notifications = () => {
  const { status, notifications } = useAppSelector(
    (state) => state.notifications
  );
  const appDispatch = useAppDispatch();

  useEffect(() => {
    if (status === "IDLE") {
      appDispatch(getNotifications());
    }
  }, [status]);

  return (
    <>
      <section className="border-right">
        <div className="border-bottom position-sticky top-0 bg-white padding-8 padding-l-16">
          <h2 className="bold">Notifications</h2>
        </div>
        {notifications.map((notification) => (
          <NotificationItem notification={notification} />
        ))}
      </section>
    </>
  );
};
