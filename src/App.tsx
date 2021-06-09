import "assests/css/index.css";
import { useAppSelector } from "app/hooks";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "components/Navbar";
import { ProtectedRoute } from "components/ProtectedRoute";
import { Home } from "pages/Home";
import { Notifications } from "pages/Notifications";
import { Explore } from "pages/Explore";
import { Profile } from "pages/Profile";
import { Signup } from "pages/Signup";
import { Login } from "pages/Login";
function App() {
  const { currentUser } = useAppSelector((state) => state.users);

  const mainLayout = currentUser ? "dis-grid loggedin-layout" : "";

  return (
    <>
      <main className={mainLayout}>
        {currentUser && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <ProtectedRoute path="/home" element={<Home />} />
          <ProtectedRoute path="/explore" element={<Explore />} />
          <ProtectedRoute path="/notifications" element={<Notifications />} />
          <ProtectedRoute path="/profile" element={<Profile />} />
          <ProtectedRoute path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
