import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../hooks/useAxios";
import { DateFormat } from "../../../Utility/DateFormat";
import { FiShield, FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxios();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleUser = (user, role) => {
    const updateInfo = { role: role };
    axiosSecure.patch(`/users/${user._id}`, updateInfo).then((res) => {
      Swal.fire({
        title: `Are sure to Change role`,
        text: `${user.displayName} to mark as ${role}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes,Agree!",
      }).then((result) => {
        if (result.isConfirmed) {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: `${user.displayName} mark as ${role} `,
              icon: "success",
              showConfirmButton: false,
              position: "top-right",
              timer: 1500,
            });
          }
        }
      });
    });
  };
  return (
    <div>
      <h2 className="text-2xl">Users Management : {users.length}</h2>
      <div className="px-6">
        <div className="bg-base-100 my-4 p-4 rounded">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Name</th>
                  <th>Create Time</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {users.map((user) => (
                  <tr key={user._id}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={user.photoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.displayName}</div>
                          <div className="text-sm opacity-50">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{DateFormat(user.createAt)}</td>
                    <td>{user.role}</td>
                    <td>
                      {user.role === "admin" ? (
                        <button
                          onClick={() => handleUser(user, "user")}
                          className="btn btn-primary"
                        >
                          <FiShieldOff className="text-xl" />
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleUser(user, "admin")}
                        >
                          <FiShield className="text-xl" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
