import "./login.css";
import wall from "assests/images/wall.jpg";
import { useReducer, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "components/Input";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { PasswordInput } from "components/PasswordInput";
import { Button } from "components/Button";
import { loginUser } from "features/userSlice/userSlice";
import { initialState, reducer } from "./reducer";
export const Login = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const appDispatch = useAppDispatch();
  const [{ email, password }, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);
  return (
    <>
      <section className="w12 sm-column row login-container">
        <img src={wall} alt="" className="responsive-img" />
        <div className="column sm-w12 w7 align-start sm-justify-start justify-center padding-l-32">
          <h1 className="bold ">Login to Greenify</h1>
          <form action="#" className="sm-w10 md-w10 w6 margin-t-16">
            <section className="column margin-b-16">
              <label htmlFor="email" className="margin-b-8 ">
                Email
              </label>
              <Input
                name="current-email"
                type="text"
                value={email}
                required
                onChange={(e) =>
                  dispatch({ type: "SET_EMAIL", payload: e.target.value })
                }
              />
            </section>
            <section className="column margin-b-16  ">
              <label htmlFor="current-password" className="margin-b-8">
                Password
              </label>
              <div className="position-relative">
                <PasswordInput
                  name="current-password"
                  onChange={(e) =>
                    dispatch({ type: "SET_PASSWORD", payload: e.target.value })
                  }
                  value={password}
                />
              </div>
            </section>
            <Button
              className="btn-pry-fil w12"
              onClick={() => appDispatch(loginUser({ email, password }))}>
              Login
            </Button>
          </form>
          <Link className="font-xs margin-t-16 bold" to="/signup">
            Don't have an account?
            <span className="primary-color"> Signup now!</span>
          </Link>
        </div>
      </section>
    </>
  );
};
