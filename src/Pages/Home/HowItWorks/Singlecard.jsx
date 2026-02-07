import React from "react";
import icon from "../../../assets/bookingIcon.png";
const Singlecard = ({ data }) => {
  return (
    <div className="bg-base-100 md:p-8 p-4 my-4 flex flex-col justify-between md:gap-4 gap-2 rounded-2xl">
      <div>
        <img src={icon} />
      </div>
      <h3 className="text-xl font-bold">{data.title}</h3>
      <p className="font-medium">{data.des}</p>
    </div>
  );
};

export default Singlecard;
