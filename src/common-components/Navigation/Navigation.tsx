import { Routes, Route } from "react-router-dom";
import { Home } from "pages/Home";
import { Notifications } from "pages/Notifications";
import { Search } from "pages/Search";
import { Profile } from "pages/Profile";
import { Signup } from "pages/Signup";
import { Login } from "pages/Login";
import { BetterRoute } from "common-components/BetterRoute";
export const Navigation = () => {
  return (
    <Routes>
      <BetterRoute type="PUBLIC-ONLY" path="/" element={<Login />} />
      <BetterRoute type="PUBLIC-ONLY" path="/signup" element={<Signup />} />
      <BetterRoute type="PROTECTED" path="/home" element={<Home />} />
      <BetterRoute type="PROTECTED" path="/search" element={<Search />} />
      <BetterRoute
        type="PROTECTED"
        path="/notifications"
        element={<Notifications />}
      />
      <BetterRoute type="PROTECTED" path="/profile" element={<Profile />} />
      <BetterRoute type="PROTECTED" path="/:username/*" element={<Profile />} />
    </Routes>
  );
};
