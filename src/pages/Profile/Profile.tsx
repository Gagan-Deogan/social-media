import "./profile.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getProfileByUsername,
  setStatusIdle,
  setStatusFulfilled,
} from "features/profilesSlice";
import { Spinner } from "components/Spinner";
import { UserDetails } from "./UserDetails";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Routes } from "react-router";
import { ProtectedRoute } from "components/ProtectedRoute";
import { Followers } from "./Followers";
import { Following } from "./Following";
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
  }, []);

  return (
    <>
      {status === "PENDING" && <Spinner />}
      {status === "FULFILLED" && profiles[username] && (
        <Routes>
          <ProtectedRoute
            path="/"
            element={
              <UserDetails userProfile={profiles[username]} />
            }></ProtectedRoute>
          <ProtectedRoute
            path="/followers"
            element={
              <Followers followers={profiles[username].followers} />
            }></ProtectedRoute>
          <ProtectedRoute
            path="/following"
            element={
              <Following following={profiles[username].following} />
            }></ProtectedRoute>
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
