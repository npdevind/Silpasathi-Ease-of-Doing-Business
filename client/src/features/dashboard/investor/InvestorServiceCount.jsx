import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetcher } from "../../../utils";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Link } from "react-router-dom";

const InvestorServiceCount = () => {
  const { data: totalServiceData, isFetching: totalServiceFetching } = useQuery({
    queryKey: ["get-total-service-count"],
    queryFn: () => fetcher(`/get-total-service-count`),
  });

  const { data: totalUnitData, isFetching: totalUnitFetching } = useQuery({
    queryKey: ["get-total-unit-count"],
    queryFn: () => fetcher(`/get-total-unit-count`),
  });

  return (
    <>
      <div className="row gx-5 mb-4">
        <div className="col-xxl-3 col-md-6 mb-3 count-box">
          <div className="card border-secondary border-4 h-100">
            <div className="card-body px-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="me-2">
                  <div className="display-5">
                    {totalUnitFetching && <LoadingSpinner />}
                    {!totalUnitFetching && totalUnitData && totalUnitData?.unitCount}
                  </div>
                  <div className="card-text">Total Units / Entrepreneur</div>
                </div>
                <div className="fs-1">
                  <i className="bi bi-building"></i>
                </div>
              </div>
              <small className="card-text">
                <Link to="/unit/add">
                  <div className="d-inline-flex align-items-center">
                    <i className="bi bi-plus-circle-dotted"></i> <span className="caption ms-1"> Add More</span>
                  </div>
                </Link>
              </small>
            </div>
          </div>
        </div>

        <div className="col-xxl-3 col-md-6 mb-3 count-box">
          <div className="card border-secondary border-4 h-100">
            <div className="card-body px-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="me-2">
                  <div className="display-5">
                    {totalServiceFetching && <LoadingSpinner />}
                    {!totalServiceFetching && totalServiceData && totalServiceData?.serviceCount}
                  </div>
                  <div className="card-text">Total Applied Services</div>
                </div>
                <div className="fs-1">
                  <i className="bi bi-tools"></i>
                </div>
              </div>
              <small className="card-text">
                <Link to="/all-services">
                  <div className="d-inline-flex align-items-center">
                    <i className="bi bi-plus-circle-dotted"></i>
                    <span className="caption ms-1"> Add More</span>
                  </div>
                </Link>
              </small>
            </div>
          </div>
        </div>

        <div className="col-xxl-3 col-md-6 mb-3 count-box">
          <div className="card border-secondary border-4 h-100">
            <div className="card-body px-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="me-2">
                  <div className="display-5">3</div>
                  <div className="card-text">Sector Specific Service</div>
                </div>
                <div className="fs-1">
                  <i className="bi bi-gear"></i>
                </div>
              </div>
              <small className="card-text">
                <Link to="/all-services">
                  <div className="d-inline-flex align-items-center">
                    <i className="bi bi-plus-circle-dotted"></i> <span className="caption ms-1"> Get License</span>
                  </div>
                </Link>
              </small>
            </div>
          </div>
        </div>

        <div className="col-xxl-3 col-md-6 mb-3 count-box">
          <div className="card border-secondary border-4 h-100">
            <div className="card-body px-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="me-2">
                  <h5 className="fw-bold">System Guided Wizard</h5>
                  <div className="card-text">Guide for the entrepreneur</div>
                </div>
                <div className="fs-1">
                  <i className="bi bi-ui-checks-grid"></i>
                </div>
              </div>
              <small className="card-text">
                <Link to="/info-wizard">
                  <div className="d-inline-flex align-items-center">
                    <i className="bi bi-plus-circle-dotted"></i> <span className="caption ms-1"> Add Service</span>
                  </div>
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestorServiceCount;
