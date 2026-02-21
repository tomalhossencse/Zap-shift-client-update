import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { FiEdit } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
const MyParcels = () => {
  const { user } = useAuth();

  const axiosSecure = useAxios();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handlePayment = async (parcel) => {
    const paymentInfo = {
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      cost: parcel.cost,
      parcelId: parcel._id,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo,
    );

    window.location.assign(res.data.url);
  };
  return (
    <div className="p-6">
      <h1>This is my parcel page.</h1>
      <h3>My Total Parcels : {parcels.length}</h3>

      <div className="bg-base-100 my-4 p-4 rounded">
        <div className="overflow-x-auto">
          <table className="table table-lg table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Cost</th>
                <th>payment</th>
                <th>DeliveryStatus</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel?._id}>
                  <th>{index + 1}</th>
                  <td>{parcel?.parcelName}</td>
                  <td>{parcel?.cost} tk</td>
                  <td>
                    {parcel.paymentStatus === "paid" ? (
                      <span className="text-green-500">Paid</span>
                    ) : (
                      <button
                        onClick={() => handlePayment(parcel)}
                        className="btn btn-primary"
                      >
                        Pay
                      </button>
                    )}
                  </td>

                  <td>{parcels?.paymentStatus}</td>
                  <td className="space-x-4">
                    <button className="btn btn-square">
                      <FiEdit />
                    </button>

                    <button className="btn btn-square">
                      <FaEye />
                    </button>

                    <button
                      onClick={() => handleParcelDelete(parcel._id)}
                      className="btn btn-square"
                    >
                      <RiDeleteBin6Line />
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

export default MyParcels;
