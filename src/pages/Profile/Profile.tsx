import "./profile.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProfileByUsername, setStatusIdle } from "features/profilesSlice";
import { Spinner } from "components/Spinner";
import { Post, UserProfile } from "types";
import { PostCard } from "components/PostCard";
import { UserDetails } from "components/UserDetails";
import { useAppDispatch, useAppSelector } from "app/hooks";

export const Profile = (): JSX.Element => {
  const { pathname } = useLocation();
  const username = pathname.slice(1);
  const { profiles, status, error } = useAppSelector((state) => state.profiles);
  const appDispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      if (status === "IDLE") {
        appDispatch(getProfileByUsername({ username: pathname }));
      }
    })();
  }, [pathname, status]);
  console.log();
  return (
    <>
      <section className="border-right">
        <div className="border-bottom position-sticky top-0 bg-white padding-8 padding-l-16">
          <h2 className="bold">Profile</h2>
        </div>
        {status === "PENDING" && <Spinner></Spinner>}
        {status === "FULFILLED" && profiles[username] && (
          <UserDetails userProfile={profiles[username]} />
        )}
        {status === "ERROR" && (
          <div>
            <h2>This account doesn’t exist</h2>
          </div>
        )}
      </section>
    </>
  );
};
