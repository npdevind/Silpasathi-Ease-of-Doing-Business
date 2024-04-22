import React from "react";
import ErrorAlert from "../../components/ErrorAlert";
import LoadingSpinner from "../../components/LoadingSpinner";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const DepartmentSelect = ({ setSelectDeptId, selectDept, setSelectDept, departmentData, departmentError, departmentLoading }) => {
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
        <div className="slider-container p-4">
          {departmentError && <ErrorAlert error={departmentError} />}
          {departmentLoading && <LoadingSpinner />}
          {departmentData && (
            <Slider {...settings}>
              {departmentData?.map((item, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="col service-area">
                      <div
                        className={
                          selectDept === item.department_name
                            ? "service-box text-center border border-2 rounded-2 p-2 active"
                            : "service-box text-center border border-2 rounded-2 p-2"
                        }
                      >
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
    </>
  );
};

export default DepartmentSelect;
