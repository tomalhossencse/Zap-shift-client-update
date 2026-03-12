import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxios();
  const { data: role = "user", isLoading } = useQuery({
    queryKey: ["user-email", `${user?.email}`],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || "user";
    },
  });
  return { role, isLoading, loading };
};

export default useRole;
