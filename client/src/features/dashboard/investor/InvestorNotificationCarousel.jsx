import React from "react";
import notificationImg from "../../../../public/images/notification-Box.png";
import { Carousel } from "react-bootstrap";

const InvestorNotificationCarousel = () => {
  return (
    <>
      <div className="card notification-box">
        <div className="card-body">
          <img alt="img" src={notificationImg} className="img-fluid" />
          <h5 className="fw-bold text-center">Latest Notification</h5>
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner text-center ">
              <Carousel>
                <Carousel.Item>
                  <p>
                    The Applicants can avail <strong> Trade License Certificate </strong> e-Service under the Department of UD&amp;MA from :{" "}
                    <a href="https://edistrict.wb.gov.in/PACE/login.do">
                      <strong>https://edistrict.wb.gov.in/PACE/login.do</strong>
                    </a>
                  </p>
                </Carousel.Item>
                <Carousel.Item>
                  <p>
                    The e-service for obtaining <strong>Land Conversion Certificate</strong> is currently unavailable due to server migration and
                    maintenance
                  </p>
                </Carousel.Item>
                <Carousel.Item>
                  <p>
                    For any technical query, kindly drop a mail at{" "}
                    <strong>
                      <a href="mailto:qrt.silpasathiwb@gmail.com">qrt.silpasathiwb@gmail.com</a>
                    </strong>
                  </p>
                </Carousel.Item>
                <Carousel.Item>
                  <p>
                    For any critical issues or difficulties faced while submitting application please call to our <strong>Quick Response Team</strong>{" "}
                    at{" "}
                    <a href="tel:+3322622004">
                      <strong>03322622004</strong>{" "}
                    </a>{" "}
                    in between <strong>10am to 6pm on Monday to Friday</strong>
                  </p>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestorNotificationCarousel;
