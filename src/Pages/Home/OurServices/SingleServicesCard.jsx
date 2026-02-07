import React from "react";
import icon from "../../../assets/service.png";
import Container from "../../../Utility/Container";
const SingleServiesCard = ({ service }) => {
  return (
    <Container className="bg-base-100 md:p-8 p-4 flex flex-col justify-between md:gap-4 gap-2 rounded-2xl cursor-pointer   transition-all duration-300 ease-out  hover:scale-105 hover:shadow-xl hover:bg-primary">
      <div>
        <img src={icon} />
      </div>
      <h3 className="text-xl font-bold">{service.title}</h3>
      <p className="font-medium">{service.des}</p>
    </Container>
  );
};

export default SingleServiesCard;
