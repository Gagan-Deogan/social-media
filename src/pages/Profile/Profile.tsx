import "./profile.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getProfileByUsername,
  setStatusIdle,
  setStatusFulfilled,
} from "features/profilesSlice";
import { Spinner } from "components/Spinner";
import { UserDetails } from "./UserDetails";
import { useAppDispatch, useAppSelector } from "app/hooks";

export const Profile = (): JSX.Element => {
  const { pathname } = useLocation();
  const username = pathname.slice(1);

  const { profiles, status } = useAppSelector((state) => state.profiles);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (status === "IDLE" && !(username in profiles)) {
        appDispatch(getProfileByUsername({ username: pathname }));
      }
      if (status === "IDLE" && username in profiles) {
        appDispatch(setStatusFulfilled());
      }
    })();
  }, [pathname, status, appDispatch, profiles, username]);

  useEffect(() => {
    return () => {
      appDispatch(setStatusIdle());
    };
  }, []);

  return (
    <>
      <section className="border-right">
        <div className="border-bottom position-sticky top-0 bg-white padding-8 padding-l-16">
          <h2 className="bold">Profile</h2>
        </div>
        {status === "PENDING" && (
          <div className="margin-64">
            <Spinner />
          </div>
        )}
        {status === "FULFILLED" && profiles[username] && (
          <UserDetails userProfile={profiles[username]} />
        )}
        {status === "ERROR" && (
          <div className="row justify-center">
            <h2 className="margin-t-64">This account doesn’t exist</h2>
          </div>
        )}
      </section>
    </>
  );
};
