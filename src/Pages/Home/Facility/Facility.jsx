import React from "react";
import Container from "../../../Utility/Container";
import FacilityCard from "./FacilityCard";
import image1 from "../../../assets/live-tracking.png";
import image2 from "../../../assets/safe-delivery.png";
import image3 from "../../../assets/tiny-deliveryman.png";

const Facility = () => {
  const facilityCollections = [
    {
      title: "Live Parcel Tracking",
      des: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      image: image1,
    },
    {
      title: " 100% Safe Delivery",
      des: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: image3,
    },

    {
      title: "24/7 Call Center Support",
      des: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: image2,
    },
  ];
  return (
    <Container>
      <div className="divider"></div>
      <div className="py-10">
        {facilityCollections.map((facility, index) => (
          <FacilityCard key={index} facility={facility} />
        ))}
      </div>
      <div className="divider"></div>
    </Container>
  );
};

export default Facility;
