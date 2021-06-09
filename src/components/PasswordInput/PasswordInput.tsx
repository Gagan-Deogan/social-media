import { useState } from "react";
import { VisibleIcon, VisibleOffIcon } from "assests/icons";
import { Input } from "components/Input";
import { PasswordInputProps } from "types";
export const PasswordInput = ({
  name,
  error,
  value,
  onChange,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Input
        name={name}
        value={value}
        type={showPassword ? "text" : "password"}
        onChange={onChange}
        required
      />
      <span
        className="position-absolute right padding-4 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}>
        {showPassword && <VisibleIcon />}
        {!showPassword && <VisibleOffIcon />}
      </span>
      <h6 className="font-xs text-error">{error}</h6>
    </>
  );
};
