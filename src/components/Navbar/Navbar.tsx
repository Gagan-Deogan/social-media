import { UserIcon, HomeIcon, SeacrhIcon, BellIcon } from "assests/icons";
import { NavLink } from "react-router-dom";
import { Hidden } from "components/Hidden";

const navOptions = {
  Home: { link: "home", icon: <HomeIcon /> },
  Explore: { link: "explore", icon: <SeacrhIcon /> },
  Notifications: { link: "notifications", icon: <BellIcon /> },
  Profile: { link: "profile", icon: <UserIcon /> },
};
export const Navbar = (): JSX.Element => {
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
        </div>
      </Hidden>
    </>
  );
};
