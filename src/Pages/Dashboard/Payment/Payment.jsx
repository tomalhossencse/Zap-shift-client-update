import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Shared/Loading/Loading";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxios();

  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  return <div>Please Pay : {parcel?.parcelName}</div>;
};

export default Payment;
