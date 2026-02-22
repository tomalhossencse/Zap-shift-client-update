import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxios = () => {
  const { user, logOut } = useAuth();
  useEffect(() => {
    // interceptor request
    const reqInterceptores = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    const resInterceptors = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statuscode = error.status;
        if (statuscode === 401 || statuscode === 403) {
          logOut();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptores);
      axiosSecure.interceptors.request.eject(resInterceptors);
    };
  }, [user]);
  return axiosSecure;
};

export default useAxios;
