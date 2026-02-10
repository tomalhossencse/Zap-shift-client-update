import React from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { IoLogOut } from "react-icons/io5";
import useAuth from "./useAuth";

const useLogout = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Succesfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return handleLogout;
};

export default useLogout;
