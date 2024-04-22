import React from "react";
import Carousel from "react-bootstrap/Carousel";

import slider1 from "../../public/images/slider1.jpg";
import slider2 from "../../public/images/slider2.jpg";
import slider3 from "../../public/images/slider3.jpg";

const Banner = ({ pageIndex }) => {
  return (
    <>
      {pageIndex === "index" && (
        <Carousel>
          <Carousel.Item interval={2500}>
            <img src={slider1} alt="" />
          </Carousel.Item>
          <Carousel.Item interval={2500}>
            <img src={slider2} alt="" />
          </Carousel.Item>
          <Carousel.Item interval={2500}>
            <img src={slider3} alt="" />
          </Carousel.Item>
        </Carousel>
      )}
      {pageIndex === "innerPage" && (
        <div className="inner-banner">
          <div className="overlay"></div>
          <div className="container">
            <div className="login-logo">
              {/* <div className="logo-img"><a href=""><img src="sites/all/themes/eodbswo/images/logo.png"></a></div> */}
              <div className="logo-text">
                <h1>Silpasathi</h1>
                <h4>The Revamped State Single Window Portal</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
