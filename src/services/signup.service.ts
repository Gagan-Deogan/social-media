import axios from "axios";
type handleSignupProps = {
  email: string;
  fullname: string;
  username: string;
  password: string;
  navigate: Function;
};
type Response = {
  success: boolean;
  data: string;
};
export const handleSignup = async ({
  email,
  fullname,
  username,
  password,
  navigate,
}: handleSignupProps) => {
  const res = await axios.post("http://localhost:8080/users/signup", {
    email,
    fullname,
    username,
    password,
  });
  const data: Response = res.data;
  if (data.success) {
    navigate("/");
  }
  return Promise.resolve();
};
