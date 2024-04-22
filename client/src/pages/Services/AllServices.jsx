import { useQuery } from "@tanstack/react-query";
import { fetcher } from "./../../utils/index";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ErrorAlert from "./../../components/ErrorAlert";
import LoadingSpinner from "./../../components/LoadingSpinner";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ServiceFilterSearch from "./ServiceFilterSearch";
import Pagination from "../../components/Pagination";

const AllServices = () => {
  const [selectDept, setSelectDept] = useState();
  const [selectDeptId, setSelectDeptId] = useState();

  const [searchService, setSearchService] = useState("");

  const [msg, setMsg] = useState();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleLimit = (val) => {
    searchParams.set("limit", val);
    setSearchParams(searchParams);
  };

  const {
    error: departmentError,
    data: departmentData,
    isFetching: departmentLoading,
  } = useQuery({
    queryKey: ["get-eodb-department-list"],
    queryFn: () => fetcher(`/get-eodb-department-list`),
  });

  useEffect(() => {
    if (selectDeptId) searchParams.set("departmentCode", selectDeptId);
    else searchParams.set("departmentCode", "");
    searchParams.set("listing", "true");
    setSearchParams(searchParams);
  }, [selectDeptId, departmentData]);

  const {
    error: serviceError,
    data: serviceData,
    isFetching: serviceLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-service-list", searchParams.toString()],
    queryFn: () => fetcher(`/get-service-list?${searchParams.toString()}`),
    enabled: departmentData ? true : false,
  });

  useEffect(() => {
    if (selectDept) refetch();
    if (searchService) {
      if (searchService.length >= 3) {
        searchParams.set("service_name", searchService);
        setSearchParams(searchParams);
        refetch();
      } else {
        searchParams.set("service_name", "");
        setSearchParams(searchParams);
        refetch();
        setMsg("Please enter more then three character.");
      }
    }
  }, [selectDept, searchService, refetch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 5,
  };

  return (
    <>
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
                  {" "}
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

      <div className="row">
        <div className="slider-container p-4">
          {departmentError && <ErrorAlert error={departmentError} />}
          {departmentLoading && <LoadingSpinner />}
          {departmentData && (
            <Slider {...settings}>
              {departmentData?.map((item, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="col service-area">
                      <div className={selectDept === item.department_name ? "service-box text-center border border-2 rounded-2 p-2 active" : "service-box text-center border border-2 rounded-2 p-2"}>
                        <Link
                          to=""
                          onClick={() => {
                            setSelectDept(item.department_name);
                            setSelectDeptId(item.dept_id);
                          }}
                        >
                          <span>
                            <i className="bi bi-gear-fill"></i>
                          </span>
                          <h4 className="fw-semibold mb-0 text-body-emphasis fs-6">{item.department_name}</h4>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          )}
        </div>
      </div>

      <div className="row">
        <div className="card p-4 service-table">
          <table className="table caption-top">
            <caption>
              <div className="row ">
                <div className="col-md-auto me-auto">
                  Department/Directorate/District Administration : <b>{selectDept ? selectDept : "All Department"}</b>
                </div>
                <div className="col-md-auto ms-auto">
                  <ServiceFilterSearch searchService={searchService} setSearchService={setSearchService} msg={msg} />
                </div>
              </div>
            </caption>
            <thead>
              <tr>
                <th style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word", width: "1%" }}>#</th>
                <th style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word", width: "50%" }}>Service Name</th>
                <th style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word", width: "5%" }}>User Manual</th>
              </tr>
            </thead>

            <tbody>
              {serviceError && <ErrorAlert error={serviceError} />}
              {!serviceData && serviceLoading && <LoadingSpinner />}
              {serviceData &&
                serviceData?.data?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="service-name" />
                        </div>
                      </th>
                      <td>
                        {item.service_name} <small className="text-danger">(WBRTPS Timeline: Real Time)</small>
                      </td>
                      <td>
                        <i className="bi bi-file-earmark-text text-success"></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Pagination data={serviceData} onLimitChange={handleLimit} limit={searchParams.get("limit")} />

          <hr />
          <span>
            <div className="d-flex gap-2">
              Selected Service :<span className="badge bg-secondary">Enrollment under Profession Tax</span>
              <span className="badge bg-secondary">Enrollment under Profession Tax</span>
              <span className="badge bg-secondary">Enrollment under Profession Tax</span>
            </div>
            <a href="#" title="Create CAF" className="btn btn-warning btn-lg float-end">
              Create CAF
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default AllServices;
