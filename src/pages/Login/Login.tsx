import "./login.css";
import wall from "assests/images/wall.jpg";
import React, { useReducer, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "common-components/Input";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { PasswordInput } from "common-components/PasswordInput";
import { loginUser } from "features/authSlice/authSlice";
import { initialState, reducer } from "./reducer";
type State = { from: string } | null;
export const Login = () => {
  const location = useLocation();
  const state = location.state as State;

  const navigate = useNavigate();
  const { currentUser, status } = useAppSelector((state) => state.auth);
  const appDispatch = useAppDispatch();
  const [{ email, password }, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (currentUser) {
      if (state) {
        navigate(state.from);
      } else {
        navigate("/home");
      }
    }
  }, [currentUser, navigate, state]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appDispatch(loginUser({ email, password }));
  };

  return (
    <>
      <section className="w12 sm-column row login-container">
        <img src={wall} alt="" className="responsive-img" />
        <div className="column sm-w12 w7 align-start sm-justify-start justify-center padding-l-32">
          <h1 className="bold ">Login to Greenify</h1>
          <form
            action="#"
            className="sm-w10 md-w10 w6 margin-t-16"
            onSubmit={handleFormSubmit}>
            <section className="column margin-b-16">
              <label htmlFor="current-email" className="margin-b-8 ">
                Email
              </label>
              <Input
                name="current-email"
                type="email"
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
            <button className="btn-pry-fil w12" disabled={status === "PENDING"}>
              Login
            </button>
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
