import React from "react";
const FacilityCard = ({ facility }) => {
  return (
    <div
      className="bg-base-100 md:p-8 p-6 my-4 flex justify-center
     items-center md:gap-4 gap-12 rounded-2xl"
    >
      <div className="w-30 h-24 overflow-hidden">
        <img className="object-center" src={facility.image} />
      </div>
      <div className="divider divider-horizontal"></div>
      <div>
        <h3 className="text-xl font-bold">{facility.title}</h3>
        <p className="font-medium">{facility.des}</p>
      </div>
    </div>
  );
};

export default FacilityCard;
