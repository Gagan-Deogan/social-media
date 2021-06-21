import "./snakbar.css";
import { useEffect } from "react";
import { CancelWhite, CheckIcon, ErrorIcon } from "assests/icons";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { hideSnakbar } from "features/snakbarSlice";

const checkTypeOfSnakbar = (type: "ALERT" | "SUCCESS") => {
  switch (type) {
    case "ALERT":
      return "snakbar-err";
    case "SUCCESS":
      return "snakbar-suc";
    default:
      return "snakbar";
  }
};

export const Snakbar = () => {
  const { type, message, isShow } = useAppSelector((state) => state.snakbar);
  const appDispatch = useAppDispatch();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      appDispatch(hideSnakbar());
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const snakbarType = checkTypeOfSnakbar(type);

  return (
    <>
      <div className={snakbarType}>
        {type === "SUCCESS" && <CheckIcon />}
        {type === "ALERT" && <ErrorIcon />}
        <h5>{message}</h5>
        <button className="btn-link" onClick={() => appDispatch(hideSnakbar())}>
          <CancelWhite />
        </button>
      </div>
    </>
  );
};
