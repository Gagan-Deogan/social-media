import "assests/css/index.css";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { setupAuthHeader } from "utils";
import { Navbar } from "components/Navbar";
import { Snakbar } from "components/Snakbar";
import { Interceptor } from "components/Interceptor";
import { Navigation } from "components/Navigation";
import { initializeUser } from "features/userSlice";
const App = () => {
  const { currentUser, token } = useAppSelector((state) => state.users);
  const { isShow } = useAppSelector((state) => state.snakbar);
  const appDispatch = useAppDispatch();
  setupAuthHeader(token);

  const mainLayout = currentUser ? "dis-grid loggedin-layout" : "";

  useEffect(() => {
    if (token) {
      appDispatch(initializeUser());
    }
  }, []);

  return (
    <>
      <Interceptor />
      {isShow && <Snakbar />}
      <main className={mainLayout}>
        {currentUser && <Navbar />}
        <Navigation />
      </main>
    </>
  );
};

export default App;
