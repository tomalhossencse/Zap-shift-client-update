import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const riderModelRef = useRef();
  const [selectedParcel, setSelectParcel] = useState(null);

  const axiosSecure = useAxios();
  const { data: parcels = [], refetch: parcelRefetch } = useQuery({
    queryKey: ["parcels", "peding-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?deliveryStatus=pending-pickup`,
      );
      return res.data;
    },
  });

  const { data: riders = [], refetch } = useQuery({
    queryKey: [
      "riders",
      "approved",
      selectedParcel?.picupWarhouse,
      "available",
    ],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&picupWarhouse=${selectedParcel.picupWarhouse}&workStatus=available`,
      );
      return res.data;
    },
  });

  const openAssignModel = (parcel) => {
    setSelectParcel(parcel);
    riderModelRef.current.showModal();
  };

  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
      parcelId: selectedParcel._id,
    };

    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          riderModelRef.current.close();
          parcelRefetch();
          Swal.fire({
            position: "top-right",
            title: `Rider has been Assigned`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
  };

  return (
    <div className="p-6">
      <h1>This is Assign Riders Page : {parcels.length}</h1>
      <div className="bg-base-100 my-4 p-4 rounded">
        {" "}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Parcel Name</th>
                <th>Cost</th>
                <th>TrackingId</th>
                <th>SenderEmail</th>
                <th>Pickup District</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel?.parcelName}</td>
                  <td> {parcel?.cost} </td>
                  <td> {parcel?.trackingId} </td>
                  <td> {parcel?.senderEmail} </td>
                  <td> {parcel?.picupWarhouse} </td>
                  <td>
                    <button
                      onClick={() => {
                        openAssignModel(parcel);
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      Find Riders
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <dialog
        ref={riderModelRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">riders : {riders.length}</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>PicupWarhouse</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, index) => (
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <p className="font-bold text-green-600"> {rider.name}</p>
                      <p className="text-xs">{rider.email}</p>
                    </td>
                    <td>{rider.picupWarhouse}</td>
                    <td>
                      <button
                        onClick={() => handleAssignRider(rider)}
                        className="btn btn-sm btn-primary"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
