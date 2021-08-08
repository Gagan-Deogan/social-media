import { useReducer } from "react";
import { Input } from "common-components/Input";
import { PasswordInput } from "common-components/PasswordInput";
import { initialState, reducer } from "./reducer";
import { signUp } from "./signup.service";
import { useNavigate } from "react-router";
import { CheckPasswordStrength } from "utils";
export const Signup = () => {
  const [
    { email, fullname, username, password, confirmPassword, error },
    dispatch,
  ] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_EMAIL", payload: e.target.value });
  };

  const changeFullname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fullname = e.target.value;
    if (fullname.length < 45) {
      dispatch({ type: "SET_FULLNAME", payload: e.target.value });
    }
  };

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    if (username.length < 45) {
      const usernameWithoutSpace = username.trim();
      dispatch({ type: "SET_USERNAME", payload: usernameWithoutSpace });
    }
  };

  const isPasswordStrong = password && CheckPasswordStrength(password);
  const bothPasswordsMatch =
    !!password && !!confirmPassword && password === confirmPassword;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      email &&
      fullname &&
      username &&
      password &&
      bothPasswordsMatch &&
      isPasswordStrong
    ) {
      dispatch({ type: "SET_STATUS", payload: "PENDING" });
      const res = await signUp({
        email,
        fullname,
        username,
        password,
      });
      if ("data" in res) {
        navigate("/login");
      } else {
        dispatch({ type: "SET_ERROR", payload: res.error });
      }
    }
  };
  return (
    <section className="w12 column align-center">
      <h1 className="margin-t-32 primary-color">Signup to Greenify</h1>
      <form
        className="column justify-center sm-w10 md-w8 w4"
        onSubmit={handleSubmit}
        action="#">
        <section className="column margin-b-16">
          <label htmlFor="new-email" className="margin-b-8 ">
            Email
          </label>
          <Input
            name="new-email"
            type="text"
            value={email}
            required
            onChange={changeEmail}
          />
        </section>
        <section className="column margin-b-16">
          <label htmlFor="new-fullname" className="margin-b-8 ">
            Fullname
          </label>
          <Input
            name="new-fullname"
            type="text"
            value={fullname}
            required
            onChange={changeFullname}
          />
        </section>
        <section className="column margin-b-16">
          <label htmlFor="new-username" className="margin-b-8 ">
            Username
          </label>
          <Input
            name="new-username"
            type="text"
            value={username}
            required
            onChange={changeUsername}
          />
        </section>
        <section className="column margin-b-16  ">
          <label htmlFor="new-password" className="margin-b-8">
            Password
          </label>
          <div className="position-relative">
            <PasswordInput
              name="new-password"
              onChange={(e) =>
                dispatch({ type: "SET_PASSWORD", payload: e.target.value })
              }
              value={password}
              error={isPasswordStrong ? "" : "Password is not Strong"}
            />
          </div>
        </section>
        <section className="column margin-b-16  ">
          <label htmlFor="confirm-password" className="margin-b-8">
            Confirm-Password
          </label>
          <div className="position-relative">
            <PasswordInput
              name="confirm-password"
              onChange={(e) =>
                dispatch({
                  type: "SET_CONFIRM_PASSWORD",
                  payload: e.target.value,
                })
              }
              value={confirmPassword}
              error={
                !bothPasswordsMatch ? "Conform Password Does not Match" : ""
              }
            />
          </div>
        </section>
        {<h6 className="text-center text-error">{error}</h6>}
        <button className="btn-pry-fil margin-t-16">Sign up</button>
      </form>
    </section>
  );
};
