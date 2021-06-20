export const CheckPasswordStrength = (password: string): boolean => {
  const regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  return !!password.match(regx);
};
