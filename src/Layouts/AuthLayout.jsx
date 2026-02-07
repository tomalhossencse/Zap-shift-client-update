import React from "react";
import Logo from "../Components/Logo/Logo";
import { Outlet } from "react-router";
import authImg from "../assets/authImage.png";
const AuthLayout = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="flex-1 flex flex-col justify-center space-y-10">
          <div className="mx-20 mb-20">
            <Logo />
          </div>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
        <div className="bg-[#FAFDF0] h-full flex items-center flex-1">
          <img src={authImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
