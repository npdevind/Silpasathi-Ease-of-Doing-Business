import React from "react";
// import InvestorApplicationStatus from "./InvestorApplicationStatus";
import InvestorServiceCount from "./InvestorServiceCount";
import InvestorSelectedService from "./InvestorSelectedService";

import InvestorProfileBox from "./InvestorProfileBox";
import InvestorNotificationCarousel from "./InvestorNotificationCarousel";

const InvestorDashboardIndex = () => {
  return (
    <>
      <div className="row">
        <div className="col-xl-9">
          <InvestorServiceCount />
          <InvestorSelectedService />
        </div>
        <div className="col-xl-3">
          <InvestorProfileBox />
          <InvestorNotificationCarousel />
        </div>
      </div>
    </>
  );
};

export default InvestorDashboardIndex;
