import { UserIcon, HomeIcon, SeacrhIcon, BellIcon } from "assests/icons";
import { NavLink } from "react-router-dom";
import { Hidden } from "components/Hidden";
import { useAppSelector } from "app/hooks";

const navOptions = {
  Home: { link: "home", icon: <HomeIcon /> },
  Search: { link: "search", icon: <SeacrhIcon /> },
  Notifications: { link: "notifications", icon: <BellIcon /> },
};
export const Navbar = (): JSX.Element => {
  const { currentUser } = useAppSelector((state) => state.auth);

  return (
    <>
      <Hidden hideAt="sm-down">
        <aside className="border-right bottom">
          <nav className="column align-start position-sticky top-64">
            {Object.entries(navOptions).map(([key, value]) => (
              <NavLink
                className="btn-link margin-t-16 border-rounded"
                to={`/${value.link}`}
                key={key}>
                {value.icon}
                <span className="margin-l-8 bold">{key}</span>
              </NavLink>
            ))}
            <NavLink
              className="btn-link margin-t-16 border-rounded"
              to={`/${currentUser?.username}`}
              key={"Profile"}>
              <UserIcon />
              <span className="margin-l-8 bold">{"Profile"}</span>
            </NavLink>
          </nav>
        </aside>
      </Hidden>
      <Hidden hideAt="sm-up">
        <div className="position-fixed bottom-0 border-top w12 row align-end justify-center bg-white">
          {Object.entries(navOptions).map(([key, value]) => (
            <NavLink
              className="btn-link margin-16 margin-t-8 border-rounded"
              to={`/${value.link}`}
              key={key}>
              {value.icon}
            </NavLink>
          ))}
          <NavLink
            className="btn-link margin-16 margin-t-8 border-rounded"
            to={`/${currentUser?.username}`}
            key={"Profile"}>
            <UserIcon />
          </NavLink>
        </div>
      </Hidden>
    </>
  );
};
