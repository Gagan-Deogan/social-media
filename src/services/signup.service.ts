import axios from "axios";
type handleSignupProps = {
  email: string;
  fullname: string;
  username: string;
  password: string;
  navigate: Function;
};
type SignUpResponse = {
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
  const res: SignUpResponse = await axios.post("/users/signup", {
    email,
    fullname,
    username,
    password,
  });
  if (res.success) {
    navigate("/");
  }
  return Promise.resolve();
};
