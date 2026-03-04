import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../Shared/Loading/Loading";
import useRole from "../hooks/useRole";
import Forbidden from "../Components/Fobidden/Forbidden";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <Loading />;
  }
  if (role !== "admin") {
    return <Forbidden />;
  }

  return children;
};

export default AdminRoute;
