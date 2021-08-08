import "assests/css/index.css";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { setupDefaultsHeader } from "utils";
import { Navbar } from "common-components/Navbar";
import { Snakbar } from "common-components/Snakbar";
import { Interceptor } from "common-components/Interceptor";
import { Navigation } from "common-components/Navigation";
import { initializeUser } from "features/authSlice";
const App = () => {
  const { currentUser, token } = useAppSelector((state) => state.auth);
  const { isShow } = useAppSelector((state) => state.snakbar);
  const appDispatch = useAppDispatch();
  setupDefaultsHeader(token);

  const mainLayout = currentUser ? "dis-grid loggedin-layout" : "";

  useEffect(() => {
    if (token) {
      appDispatch(initializeUser());
    }
  }, [token, appDispatch]);

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
