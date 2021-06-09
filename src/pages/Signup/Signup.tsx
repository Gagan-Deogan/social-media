import { useReducer } from "react";
import { Input } from "components/Input";
import { PasswordInput } from "components/PasswordInput";
import { initialState, reducer } from "./reducer";
import { Button } from "components/Button";
import { handleSignup } from "services";
import { useNavigate } from "react-router";
export const Signup = () => {
  const [
    { email, fullname, username, password, confirmPassword },
    dispatch,
  ] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  return (
    <section className="w12 column align-center">
      <h1 className="margin-t-32 primary-color">Signup to Greenify</h1>
      <form className="column justify-center sm-w10 md-w8 w4">
        <section className="column margin-b-16">
          <label htmlFor="new-email" className="margin-b-8 ">
            Email
          </label>
          <Input
            name="new-email"
            type="text"
            value={email}
            required
            onChange={(e) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
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
            onChange={(e) =>
              dispatch({ type: "SET_FULLNAME", payload: e.target.value })
            }
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
            onChange={(e) =>
              dispatch({ type: "SET_USERNAME", payload: e.target.value })
            }
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
            />
          </div>
        </section>
        <Button
          className="btn-pry-fil margin-t-16"
          onClick={() =>
            handleSignup({ email, fullname, username, password, navigate })
          }>
          Sign up
        </Button>
      </form>
    </section>
  );
};
