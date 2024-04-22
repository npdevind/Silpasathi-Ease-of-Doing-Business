import React from "react";
import { Link } from "react-router-dom";

const UnitSelect = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <div className="d-flex gap-3 p-2 service-unit-area rounded-2">
            <div className="col text-center align-items-center justify-content-center text-white">
              <i className="bi bi-building fs-1"></i>
              <h4 className="m-0">
                <b>Unit title</b> selected
              </h4>
              <button type="button" className="btn btn-outline-light">
                Change your Unit / Entrepreneur
              </button>
            </div>

            <div className="col unit-box">
              <div className="card p-3 border-2 border d-block bg-light">
                <h4 className="fw-semibold mb-0 text-body-emphasis position-relative">
                  Unit / Entrepreneur title{" "}
                  <div className="position-absolute top-0 end-0">
                    <span className="rounded-pill fs-3 text-success">
                      <i className="bi bi-check-circle-fill"></i>
                    </span>
                  </div>
                </h4>

                <small className="text-body-secondary fw-bolder">Category | Ownership </small>
                <p className="text-body-secondary fw-light">
                  <i className="bi bi-geo-alt"></i> Bidhanpally, Maslandapur...
                </p>
                <span className="badge rounded-pill text-bg-success">
                  <i className="bi bi-pencil-square"></i> Details
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-xxl-6 col-md-6 mb-3 count-box">
              <div className="card border-secondary border-4 h-100">
                <div className="card-body px-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="me-2">
                      <h5 className="fw-bold">Sector Specific Service</h5>
                      <div className="card-text">
                        Total <span className="badge rounded-pill bg-success">3</span> services under the specific{" "}
                      </div>
                    </div>
                    <div className="fs-2">
                      <i className="bi bi-gear"></i>
                    </div>
                  </div>
                  <small className="card-text">
                    <div className="d-inline-flex align-items-center">
                      <Link>
                        <i className="bi bi-plus-circle-dotted"></i> <span className="caption ms-1">Get License</span>
                      </Link>
                    </div>
                  </small>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6 mb-3 count-box">
              <div className="card border-secondary border-4 h-100">
                <div className="card-body px-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="me-2">
                      <h5 className="fw-bold">System Guided Wizard</h5>
                      <div className="card-text">Step to step guide for the entrepreneur</div>
                    </div>
                    <div className="fs-1">
                      <i className="bi bi-ui-checks-grid"></i>
                    </div>
                  </div>
                  <small className="card-text">
                    <div className="d-inline-flex align-items-center">
                      <Link>
                        <i className="bi bi-plus-circle-dotted"></i> <span className="caption ms-1"> Add Service</span>
                      </Link>
                    </div>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitSelect;
