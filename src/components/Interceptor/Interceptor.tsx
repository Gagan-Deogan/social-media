import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { logout } from "features/userSlice";
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
        return res;
      },
      (error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 403) {
            navigate("/login");
            appDispatch(logout());
          }
          if (status === 422) {
            appDispatch(
              showSnakbar({ type: "ALERT", message: error.response.data.data })
            );
          }
        }
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
