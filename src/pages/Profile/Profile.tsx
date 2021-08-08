import "./profile.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getProfileByUsername,
  setStatusIdle,
  setStatusFulfilled,
} from "features/profilesSlice";
import { Spinner } from "common-components/Spinner";
import { UserDetails } from "./components/UserDetails";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Routes } from "react-router";
import { BetterRoute } from "common-components/BetterRoute";
import { Followers } from "./components/Followers";
import { Following } from "./components/Following";
export const Profile = (): JSX.Element => {
  const { username } = useParams();

  const { profiles, status } = useAppSelector((state) => state.profiles);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (status === "IDLE" && !profiles[username]) {
        appDispatch(getProfileByUsername({ username }));
      }
      if (status === "IDLE" && profiles[username]) {
        appDispatch(setStatusFulfilled());
      }
    })();
  }, [status, appDispatch, profiles, username]);

  useEffect(() => {
    return () => {
      appDispatch(setStatusIdle());
    };
  }, [appDispatch]);

  return (
    <>
      {status === "PENDING" && <Spinner />}
      {status === "FULFILLED" && profiles[username] && (
        <Routes>
          <BetterRoute
            type="PROTECTED"
            path="/"
            element={
              <UserDetails userProfile={profiles[username]} />
            }></BetterRoute>
          <BetterRoute
            type="PROTECTED"
            path="/followers"
            element={
              <Followers followers={profiles[username].followers} />
            }></BetterRoute>
          <BetterRoute
            type="PROTECTED"
            path="/following"
            element={
              <Following following={profiles[username].following} />
            }></BetterRoute>
        </Routes>
      )}
      {status === "ERROR" && (
        <div className="row justify-center">
          <h2 className="margin-t-64">This account doesn’t exist</h2>
        </div>
      )}
    </>
  );
};
