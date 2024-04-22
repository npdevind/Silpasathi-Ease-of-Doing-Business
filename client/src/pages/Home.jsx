import React from "react";
import logo from "../../public/images/logo.png";
import { Link } from "react-router-dom";
import DocumentTitle from "../components/DocumentTitle";

const Home = () => {
  const serviceArray = [
    {
      title: "EoDB in Bengal",
      description: `State government departments and agencies have implemented
        a number of reforms for EoDB in the State.`,
      icon: "bi bi-briefcase",
    },
    {
      title: "EoDB Dashboard",
      description: `State Integrated Portal for EoDB. You can find there the
      real time data from departments wise apply services.`,
      icon: "bi bi-speedometer2",
    },
    {
      title: "Online Single Window",
      description: `A Single Window System will provide single window service
        under the various applicable Acts & Rules and Schemes.`,
      icon: "bi bi-display",
    },
    {
      title: "Central Inspection System",
      description: `A Central Inspection System has been developed for
        inspections of Industries conducted by Labour Department`,
      icon: "bi bi-diagram-3",
    },
    {
      title: "Draft Business Regulations and Final Notifications",
      description: `Online System for publishing draft business regulations,
        receiving public comments / feedback.`,
      icon: "bi bi-megaphone",
    },
    {
      title: "Third Party Verification",
      description: `Online System for search unit wise establishment
        information and track Registration/License Details.`,
      icon: "bi bi-patch-check",
    },
  ];
  return (
    <>
      <DocumentTitle
        title={`Welcome to Silpasathi || State Online Single Window Services || Ease of
          Doing Business || Government of West Bengal | Silpasathi || State Online
          Single Window Services || Ease of Doing Business || Government of West
          Bengal`}
      />
      <div className="count">
        <div className="container d-flex">
          <div className="count_box col">
            <div className="count_box_text">
              <span className="count_no">
                <strong>20</strong>
              </span>
              <span className="count_label">Total Government Entities</span>
            </div>
          </div>
          <div className="count_box col">
            <div className="count_box_text">
              <span className="count_no">
                <strong>106</strong>
              </span>
              <span className="count_label">Total Services</span>
            </div>
          </div>
          <div className="count_box col">
            <div className="count_box_text">
              <span className="count_no">
                <strong>147810</strong>
              </span>
              <span className="count_label">Total Registered Users</span>
            </div>
          </div>
          <div className="count_box col">
            <div className="count_box_text">
              <span className="count_no">
                <strong>292472</strong>
              </span>
              <span className="count_label">Submitted Applications</span>
            </div>
          </div>
          <div className="count_box col">
            <div className="count_box_text">
              <span className="count_no">
                <strong>275535</strong>
              </span>
              <span className="count_label">Approved Applications</span>
            </div>
          </div>
          <div className="count_box col">
            <div className="count_box_text">
              <span className="count_no">
                <strong>13623211</strong>
              </span>
              <span className="count_label">Site Counter</span>
            </div>
          </div>
        </div>
      </div>

      <section className="services">
        <div className="container-lg">
          <div className="row justify-content-center mb-3">
            <div className="col-xl-9 col-lg-9">
              <div className="text-center">
                <div className="heading_s1 text-center">
                  <div className="wb-logo-home-mobile">
                    <img src={logo} alt="West Bengal Logo" />
                  </div>
                  <h1>Silpasathi</h1>
                  <h2>State Single Window Portal for Industries</h2>
                </div>
                <p>
                  Single Window Services can be accessed through an EODB-Online
                  Single Window Portal using IT-enabled devices which includes
                  desktop PCs and laptops.Later, this facility will also be
                  available on tablets and smartphones.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {serviceArray.map((item, index) => {
              return (
                <div
                  className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3"
                  key={index}
                >
                  <Link href="#">
                    <div className="services_box d-flex p-4">
                      <div className="services_box_icon">
                        <i className={item.icon}></i>
                      </div>
                      <div className="services_box_text">
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
