import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "rider_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=rider_assigned`,
      );

      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
    };
    const message = `parcel status is updated with ${status.split("_").join(" ")}`;
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-right",
            title: message,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
  };
  return (
    <div className="p-6">
      <h1>Assigned Deliveries : {parcels.length}</h1>

      <div className="bg-base-100 my-4 p-4 rounded">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Parcel Name</th>
                <th>SenderEmail</th>
                <th>DeliveryStatus</th>
                <th>Confirm</th>
                <th>Acton</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel?.parcelName}</td>
                  <td>{parcel?.senderEmail}</td>
                  <td className="text-error font-bold">
                    {parcel?.deliveryStatus}
                  </td>
                  <td className="space-x-2">
                    {parcel?.deliveryStatus === "rider_assigned" ? (
                      <>
                        <button
                          onClick={() =>
                            handleDeliveryStatusUpdate(parcel, "rider_arriving")
                          }
                          className="btn btn-primary btn-sm"
                        >
                          Accept
                        </button>
                        <button className="btn btn-error btn-sm">Reject</button>
                      </>
                    ) : (
                      <span className="text-green-500">Accepted</span>
                    )}
                  </td>

                  <td className="space-x-2">
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                      }
                      className="btn btn-primary btn-sm"
                    >
                      Mark as Picked Up
                    </button>
                    <button
                      onClick={() =>
                        handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                      }
                      className="btn btn-warning btn-sm"
                    >
                      Mark as Deliverd
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
