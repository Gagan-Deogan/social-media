import { Route, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { RouteProps } from "./route.types";

export const BetterRoute: React.FC<RouteProps> = (props) => {
  const { currentUser } = useAppSelector((state) => state.auth);

  const location = useLocation();
  const { pathname } = location;
  const state = location.state as { from: string } | null;
  const { from } = state ?? { from: "/home" };
  const { path, type } = { ...props };
  switch (type) {
    case "PROTECTED":
      return currentUser ? (
        <Route path={path} {...props} />
      ) : (
        <Navigate state={{ from: pathname }} replace to="/" />
      );
    case "PUBLIC-ONLY":
      return !currentUser ? (
        <Route path={path} {...props} />
      ) : (
        <Navigate replace to={from} />
      );
  }
};
