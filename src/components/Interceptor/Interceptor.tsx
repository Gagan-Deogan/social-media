import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { logout } from "features/authSlice";
import { showSnakbar } from "features/snakbarSlice";
export const Interceptor = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const [errorInterceptor, setErrorInterceptor] = useState<number | undefined>(
    undefined
  );

  const addErrorInterceptor = () => {
    const errorInterceptor = axios.interceptors.response.use(
      (res) => {
        if (res.status === 201) {
          appDispatch(
            showSnakbar({ type: "SUCCESS", message: "Successfully created" })
          );
        }
        return res.data;
      },
      (error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 403) {
            navigate("/login");
            appDispatch(logout());
            return Promise.reject(error);
          }
          if (status === 422) {
            appDispatch(
              showSnakbar({ type: "ALERT", message: error.response.data.error })
            );
            return Promise.reject(error);
          }
        }
        appDispatch(
          showSnakbar({ type: "ALERT", message: "Something went wrong." })
        );
        return Promise.reject(error);
      }
    );
    setErrorInterceptor(errorInterceptor);
  };

  const removeErrorInterceptor = () => {
    if (errorInterceptor) {
      axios.interceptors.request.eject(errorInterceptor);
      setErrorInterceptor(undefined);
    }
  };

  useEffect(() => {
    addErrorInterceptor();
    return () => {
      removeErrorInterceptor();
    };
  }, []);
  return <></>;
};
