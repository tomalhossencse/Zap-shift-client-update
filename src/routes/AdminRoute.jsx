import React from "react";
import Loading from "../Shared/Loading/Loading";
import useRole from "../hooks/useRole";
import Forbidden from "../Components/Fobidden/Forbidden";

const AdminRoute = ({ children }) => {
  const { role, isLoading, loading } = useRole();

  if (loading || isLoading) {
    return <Loading />;
  }
  if (role !== "admin") {
    return <Forbidden />;
  }

  return children;
};

export default AdminRoute;
