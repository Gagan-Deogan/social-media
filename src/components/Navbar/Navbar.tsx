import { UserIcon, HomeIcon, SeacrhIcon, BellIcon } from "assests/icons";
import { NavLink } from "react-router-dom";
import { Hidden } from "components/Hidden";

export const Navbar = (): JSX.Element => {
  return (
    <>
      <Hidden hideAt="sm-down">
        <aside className="position-sticky border-right">
          <nav className="column align-start margin-t-64">
            <NavLink className="btn-link margin-t-16 border-rounded" to="/home">
              <HomeIcon />
              <span className="margin-l-8 bold">Home</span>
            </NavLink>
            <NavLink
              className="btn-link margin-t-16 border-rounded"
              to="/explore">
              <SeacrhIcon />
              <span className="margin-l-8 bold">Explore</span>
            </NavLink>
            <NavLink
              className="btn-link margin-t-16 border-rounded"
              to="/Notifications">
              <BellIcon />
              <span className="margin-l-8 bold">Notification</span>
            </NavLink>
            <NavLink
              className="btn-link margin-t-16 border-rounded"
              to="/profile">
              <UserIcon />
              <span className="margin-l-8 bold">Profile</span>
            </NavLink>
          </nav>
        </aside>
      </Hidden>
      <Hidden hideAt="sm-up">
        <nav className="position-absolute bottom-0 border-top w12 row justify-center">
          <NavLink
            className="btn-link margin-16 margin-t-8 border-rounded"
            to="/home">
            <HomeIcon />
          </NavLink>
          <NavLink
            className="btn-link margin-16 margin-t-8 border-rounded"
            to="/explore">
            <SeacrhIcon />
          </NavLink>
          <NavLink
            className="btn-link margin-16 margin-t-8 border-rounded"
            to="/Notification">
            <BellIcon />
          </NavLink>
          <NavLink
            className="btn-link margin-16 margin-t-8 border-rounded"
            to="/profile">
            <UserIcon />
          </NavLink>
        </nav>
      </Hidden>
    </>
  );
};
