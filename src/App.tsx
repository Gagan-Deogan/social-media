import "assests/css/index.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "components/Navbar";
import { Home } from "features/Home";
import { Notifications } from "features/Notifications";
import { Explore } from "features/Explore";
import { Profile } from "features/Profile";
import { Login } from "features/Login";
function App() {
  return (
    <>
      <main className="dis-grid main-layout">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
