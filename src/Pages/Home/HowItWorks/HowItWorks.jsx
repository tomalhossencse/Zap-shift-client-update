import React from "react";
import Container from "../../../Utility/Container";
import Singlecard from "./Singlecard";

const HowItWorks = () => {
  const dataCollections = [
    {
      title: "Booking Pick & Drop",
      des: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Cash On Delivery",
      des: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Delivery Hub",
      des: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      title: "Booking SME & Corporate",
      des: "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];
  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-secondary">How it works</h1>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
        {dataCollections.map((data, index) => (
          <Singlecard key={index} data={data}></Singlecard>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
