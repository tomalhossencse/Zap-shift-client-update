import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const { data: role = "user", isLoading } = useQuery({
    queryKey: ["user-email", `${user?.email}`],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || "user";
    },
  });
  return { role, isLoading };
};

export default useRole;
