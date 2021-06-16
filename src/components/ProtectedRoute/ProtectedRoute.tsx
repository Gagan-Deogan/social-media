import { Route, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { ProtectRouteProps } from "./types";

export const ProtectedRoute: React.FC<ProtectRouteProps> = (props) => {
  const { pathname } = useLocation();

  const { path } = { ...props };
  const { currentUser } = useAppSelector((state) => state.users);
  return currentUser ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: pathname }} replace to="/" />
  );
};
