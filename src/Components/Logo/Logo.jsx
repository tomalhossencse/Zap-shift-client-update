import React from "react";
import logo from "../../assets/logo.png";
const Logo = () => {
  return (
    <div className="flex items-end relative">
      <img src={logo} alt="" />
      <h3 className="absolute left-6 text-3xl font-extrabold text-secondary -ms-2.5">
        ZapShift
      </h3>
    </div>
  );
};

export default Logo;
