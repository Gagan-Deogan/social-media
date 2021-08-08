import axios from "axios";
import { useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { logout } from "features/authSlice";
import { showSnakbar } from "features/snakbarSlice";
export const Interceptor = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const errorInterceptor = useRef<number | undefined>(undefined);

  const addErrorInterceptor = useCallback(() => {
    errorInterceptor.current = axios.interceptors.response.use(
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
          return Promise.reject(error);
        }
        appDispatch(
          showSnakbar({ type: "ALERT", message: "Something went wrong." })
        );
        return Promise.reject(error);
      }
    );
  }, [appDispatch, navigate]);

  const removeErrorInterceptor = () => {
    if (errorInterceptor.current) {
      axios.interceptors.request.eject(errorInterceptor.current);
      errorInterceptor.current = undefined;
    }
  };

  useEffect(() => {
    addErrorInterceptor();
    return () => {
      removeErrorInterceptor();
    };
  }, [addErrorInterceptor]);
  return <></>;
};
