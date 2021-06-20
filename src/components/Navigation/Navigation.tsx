import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "components/ProtectedRoute";
import { Home } from "pages/Home";
import { Notifications } from "pages/Notifications";
import { Search } from "pages/Search";
import { Profile } from "pages/Profile";
import { Signup } from "pages/Signup";
import { Login } from "pages/Login";
import { PostDetails } from "pages/PostDetails/PostDetails";
export const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <ProtectedRoute path="/home" element={<Home />} />
      <ProtectedRoute path="/search" element={<Search />} />
      <ProtectedRoute path="/notifications" element={<Notifications />} />
      <ProtectedRoute path="/profile" element={<Profile />} />
      <ProtectedRoute path="/:username" element={<Profile />} />
      <ProtectedRoute
        path="/:username/post/:postId"
        element={<PostDetails />}
      />
    </Routes>
  );
};
