import { InputProps } from "types";

export const Input = ({
  type,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
}: InputProps) => {
  return (
    <input
      name={name}
      type={type}
      autoComplete={name}
      aria-describedby={`${name}-constraints`}
      className="w12"
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
  );
};
