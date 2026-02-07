import React from "react";
import HeroSlider from "../HeroSlider/HeroSlider";
import HowItWorks from "../HowItWorks/HowItWorks";
import OurServices from "../OurServices/OurServices";
import Brands from "../Brands/Brands";
import Facility from "../Facility/Facility";
import Reviews from "../Reviews/Reviews";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <HowItWorks />
      <OurServices />
      <Brands />
      <Facility />
      <Reviews reviewsPromise={reviewsPromise} />
    </div>
  );
};

export default Home;
