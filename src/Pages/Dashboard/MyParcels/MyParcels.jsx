import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const { data: parcels = [] } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h1>This is my parcel page.</h1>
      <h3>My Total Parcels : {parcels.length}</h3>
    </div>
  );
};

export default MyParcels;
