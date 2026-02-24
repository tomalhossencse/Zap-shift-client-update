import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../Shared/Loading/Loading";
import { DateFormat } from "../../../Utility/DateFormat";
import { FaTrash, FaUserCheck } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxios();
  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  //   console.log("riders data : ", riders);

  const handleUpdateStatus = (rider, status) => {
    const updateInfo = {
      status: status,
      email: rider.email,
    };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-right",
          title: `Rider Status is set to ${status}`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleDeleteRider = (id) => {
    axiosSecure.delete(`/riders/${id}`).then((res) => {
      if (res.data.deletedCount) {
        refetch();
        Swal.fire({
          position: "top-right",
          title: `Rider has been Deleted`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-6">
      <h1>This Approve Riders page : {riders.length}</h1>
      <div className="bg-base-100 my-4 p-4 rounded">
        {" "}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Rider Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Status</th>
                <th>Apply Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {riders.map((rider, index) => (
                <tr key={rider._id}>
                  <th>{index + 1}</th>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>
                    {rider.picupWarhouse}, {rider.riderRegion}
                  </td>
                  <td>
                    <p
                      className={`${
                        rider.status === "approved"
                          ? "text-green-500"
                          : rider.status === "rejected"
                            ? "text-red-500"
                            : ""
                      }`}
                    >
                      {rider.status}
                    </p>
                  </td>
                  <td>{DateFormat(rider.createAt)}</td>
                  <td className="space-x-4">
                    <button
                      className="btn"
                      onClick={() => handleUpdateStatus(rider, "approved")}
                    >
                      <FaUserCheck className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(rider, "rejected")}
                      className="btn"
                    >
                      <IoPersonRemoveSharp className="text-xl" />
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleDeleteRider(rider._id)}
                    >
                      <FaTrash className="text-xl" />
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

export default ApproveRiders;
