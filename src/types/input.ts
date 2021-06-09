export type InputProps = {
  type: "text" | "password" | "email";
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  disabled?: boolean;
};
export type PasswordInputProps = {
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
