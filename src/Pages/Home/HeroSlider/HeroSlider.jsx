import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";
import Container from "../../../Utility/Container";

const HeroSlider = () => {
  return (
    <Container className={"my-4"}>
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div>
          <img src={bannerImg1} />
        </div>
        <div>
          <img src={bannerImg2} />
        </div>
        <div>
          <img src={bannerImg3} />
        </div>
      </Carousel>
    </Container>
  );
};

export default HeroSlider;
