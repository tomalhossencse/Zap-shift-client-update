import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loading from "../Shared/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  //   console.log(location);
  const { user, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to={"/login"} state={location?.pathname}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
