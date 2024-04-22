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
import UnitSelect from "../../features/services_for_caf/UnitSelect";
import DepartmentSelect from "../../features/services_for_caf/DepartmentSelect";
import SelectedServices from "../../features/services_for_caf/SelectedServices";

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

  return (
    <>
      <UnitSelect />

      <DepartmentSelect
        setSelectDeptId={setSelectDeptId}
        selectDept={selectDept}
        setSelectDept={setSelectDept}
        departmentData={departmentData}
        departmentError={departmentError}
        departmentLoading={departmentLoading}
      />

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
          <SelectedServices />
        </div>
      </div>
    </>
  );
};

export default AllServices;
