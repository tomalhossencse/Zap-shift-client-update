import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { FiEdit } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
const MyParcels = () => {
  const { user } = useAuth();

  const axiosSecure = useAxios();

  const { data: parcels = [] } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel?._id}>
                  <th>{index + 1}</th>
                  <td>{parcel?.parcelName}</td>
                  <td>{parcel?.cost} tk</td>
                  <td className="space-x-4">
                    <button className="btn btn-square">
                      <FiEdit />
                    </button>

                    <button className="btn btn-square">
                      <FaEye />
                    </button>

                    <button className="btn btn-square">
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
