import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher, updater } from "./../../utils/index";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ErrorAlert from "./../../components/ErrorAlert";
import LoadingSpinner from "./../../components/LoadingSpinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ServiceFilterSearch from "./ServiceFilterSearch";
import Pagination from "../../components/Pagination";
import UnitSelect from "../../features/services_for_caf/UnitSelect";
import DepartmentSelect from "../../features/services_for_caf/DepartmentSelect";
import SelectedServices from "../../features/services_for_caf/SelectedServices";
import { toast } from "react-toastify";

const AllServices = () => {
  const [selectDept, setSelectDept] = useState();
  const [selectDeptId, setSelectDeptId] = useState();

  const [searchService, setSearchService] = useState("");

  const [msg, setMsg] = useState();

  const [searchParams, setSearchParams] = useSearchParams();

  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedItemsIds, setCheckedItemsIds] = useState([]);

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
        searchParams.set("page", 1);
        setSearchParams(searchParams);
        refetch();
      } else {
        searchParams.set("service_name", "");
        searchParams.set("page", "");
        setSearchParams(searchParams);
        refetch();
        setMsg("Please enter more then three character.");
      }
    }
  }, [selectDept, searchService, refetch]);

  const handleCheckboxChange = (option, optionId) => {
    const currentIndex = checkedItems.indexOf(option);
    const newCheckedItems = [...checkedItems];

    if (currentIndex === -1) {
      newCheckedItems.push(option);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }

    setCheckedItems(newCheckedItems);

    const currentIdIndex = checkedItemsIds.indexOf(optionId);
    const newCheckedItemsIds = [...checkedItemsIds];

    if (currentIdIndex === -1) {
      newCheckedItemsIds.push(optionId);
    } else {
      newCheckedItemsIds.splice(currentIdIndex, 1);
    }
    setCheckedItemsIds(newCheckedItemsIds);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({ body, method, url }) => updater({ url: url, method: method || "POST", body: body }),
  });

  const query = useQueryClient();
  const navigate = useNavigate();
  const handelCreateCaf = () => {
    if (checkedItems.length === 0 && checkedItemsIds.length === 0) toast.error("Please select services");
    const formData = {
      serviceId: checkedItemsIds,
      unitId: 0,
    };
    mutate(
      { url: `/create-new-caf`, body: formData },
      {
        onSuccess(data, variables, context) {
          toast.success(data.message);
          navigate("/dashboard");
          query.removeQueries({ queryKey: ["get-est-service-info"] });
        },
        onError(error, variables, context) {
          toast.error(error.message);
        },
      }
    );
  };

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
      {serviceError && <ErrorAlert error={serviceError} />}
      {!serviceData && serviceLoading && <LoadingSpinner />}
      <div className="row">
        <div className="card service-table">
          <div className="card-body">
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
                {serviceData &&
                  serviceData?.data?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="service-name"
                              checked={checkedItemsIds.includes(item.service_id)}
                              onClick={() => {
                                checkedItems.includes(item.service_name);
                                checkedItemsIds.includes(item.service_id);
                              }}
                              onChange={() => handleCheckboxChange(item.service_name, item.service_id)}
                            />
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

            {checkedItems.length > 0 && (
              <>
                <hr />
                <SelectedServices checkedItems={checkedItems} />
              </>
            )}
          </div>
          <div className="card-footer border-0 bg-white">
            <button title="Create CAF" disabled={isPending} className="btn btn-warning btn-ml float-end" onClick={() => handelCreateCaf()}>
              {isPending && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Create CAF
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllServices;
