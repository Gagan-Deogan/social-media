import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "components/ProtectedRoute";
import { Home } from "pages/Home";
import { Notifications } from "pages/Notifications";
import { Explore } from "pages/Explore";
import { Profile } from "pages/Profile";
import { Signup } from "pages/Signup";
import { Login } from "pages/Login";
export const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <ProtectedRoute path="/home" element={<Home />} />
      <ProtectedRoute path="/explore" element={<Explore />} />
      <ProtectedRoute path="/notifications" element={<Notifications />} />
      <ProtectedRoute path="/profile" element={<Profile />} />
      <ProtectedRoute path="/signup" element={<Signup />} />
    </Routes>
  );
};
