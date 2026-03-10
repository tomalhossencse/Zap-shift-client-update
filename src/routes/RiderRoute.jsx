import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../Shared/Loading/Loading";
import Forbidden from "../Components/Fobidden/Forbidden";

const RiderRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <Loading />;
  }
  if (role !== "rider") {
    return <Forbidden />;
  }
  return children;
};

export default RiderRoute;
