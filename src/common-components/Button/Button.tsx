import { useState } from "react";
import { Spinner } from "common-components/Spinner";
import { ButtonProps } from "./type";
export const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, onClick, disabled } = props;
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onClick().then(() => setLoading(false));
  };
  return (
    <button
      className={`${className} ${loading && "btn-dis"} `}
      onClick={() => handleClick()}
      disabled={loading || disabled}>
      {loading ? <Spinner /> : children}{" "}
    </button>
  );
};
