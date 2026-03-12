import React from "react";
import useRole from "../../../hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";
import UserDashboardHome from "./UserDashboardHome";
import Loading from "../../../Shared/Loading/Loading";

const DashboardHome = () => {
  const { role, isLoading } = useRole();

  if (isLoading) return <Loading />;

  if (role === "admin") {
    return <AdminDashboardHome />;
  } else if (role === "rider") {
    return <RiderDashboardHome />;
  } else {
    return <UserDashboardHome />;
  }
};

export default DashboardHome;
