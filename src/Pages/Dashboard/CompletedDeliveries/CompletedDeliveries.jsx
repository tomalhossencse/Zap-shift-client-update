import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { DateFormat } from "../../../Utility/DateFormat";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", user?.email, "rider_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=parcel_delivered`,
      );

      return res.data;
    },
  });

  const calculatePayout = (parcel) => {
    if (parcel.picupWarhouse === parcel.receiverWarhouse) {
      return parcel.cost * 0.8;
    }
    return parcel.cost * 0.6;
  };

  return (
    <div className="p-6">
      <h1>Completed Deliveries : {parcels.length}</h1>
      <div className="bg-base-100 my-4 p-4 rounded">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Parcel Name</th>
                <th>SenderEmail</th>
                <th>From</th>
                <th>To</th>
                <th>Cost</th>
                <th>Payout</th>
                <th>Create Time</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel?.parcelName}</td>
                  <td>{parcel?.senderEmail}</td>
                  <td>{parcel?.picupWarhouse}</td>
                  <td>{parcel?.receiverWarhouse}</td>

                  <td>{parcel?.cost} tk</td>
                  <td>{calculatePayout(parcel)} tk</td>
                  <td>{DateFormat(parcel?.createAt)} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
