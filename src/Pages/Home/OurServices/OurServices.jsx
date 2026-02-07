import React from "react";
import Container from "../../../Utility/Container";
import SingleServiesCard from "./SingleServicesCard";

const OurServices = () => {
  const servicesCollections = [
    {
      title: "Express  & Standard Delivery",
      des: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      title: "Nationwide Delivery",
      des: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      title: "Fulfillment Solution",
      des: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      title: "Cash on Home Delivery",
      des: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      title: "Corporate Service / Contract In Logistics",
      des: "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      title: "Parcel Return",
      des: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];
  return (
    <div className="py-12">
      <Container className={"bg-secondary p-24 space-y-4 rounded-4xl"}>
        <h1 className="text-4xl font-extrabold text-base-100 text-center">
          Our Services
        </h1>
        <p className="text-base-100 font-medium max-w-3xl mx-auto text-center">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-6 my-8">
          {servicesCollections.map((service, index) => (
            <SingleServiesCard key={index} service={service} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default OurServices;
