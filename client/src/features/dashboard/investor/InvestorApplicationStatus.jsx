import React from "react";
import { ProgressBar } from "react-bootstrap";

const InvestorApplicationStatus = () => {
  return (
    <>
      <div className="card mb-4 border border-2">
        <div className="card-block">
          <div className="row p-4">
            <div className="col-xl-4 col-md-6">
              <h6>Current Application</h6>
              <h5 className="fw-bold">
                25% <small className="badge rounded-pill bg-light text-dark">In Process</small>
              </h5>
              <ProgressBar
                striped={true}
                variant="info"
                now={25}
                animated={true}
                style={{ transition: "width 1.5s ease-in-out", height: "10px" }}
                className="border"
              />
              {/* <div className="progress" style={{ height: "10px" }}>
                <div className="progress-bar progress-bar-striped bg-info" style={{ width: "25%" }}></div>
              </div> */}
            </div>
            <div className="col-xl-4 col-md-6">
              <h6>Approved Application</h6>
              <h5 className="fw-bold">2</h5>
              <ProgressBar
                striped={true}
                variant="success"
                now={85}
                animated={true}
                style={{ transition: "width 1.5s ease-in-out", height: "10px" }}
                className="border"
              />
            </div>
            <div className="col-xl-4 col-md-6">
              <h6>Rejected Application</h6>
              <h5 className="fw-bold">0</h5>
              <ProgressBar
                striped={true}
                variant="danger"
                now={55}
                animated={true}
                style={{ transition: "width 1.5s ease-in-out", height: "10px" }}
                className="border"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestorApplicationStatus;
