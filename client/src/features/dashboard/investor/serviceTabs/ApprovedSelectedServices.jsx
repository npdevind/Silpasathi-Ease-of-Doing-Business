import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetcher } from "../../../../utils";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ErrorAlert from "../../../../components/ErrorAlert";
import { Accordion, ProgressBar } from "react-bootstrap";
import Pagination from "../../../../components/Pagination";
import SelectedServiceDetails from "./SelectedServiceDetails";

const ApprovedSelectedServices = () => {
  const [show, setShow] = useState(false);
  const [cafIdServiceID, setCafNo] = useState("");
  const handleClose = () => {
    setShow(false);
    setCafNo("");
  };

  const [cafId, setCafId] = useState();

  const [searchParams, setSearchParams] = useSearchParams("");
  searchParams.set("serviceType", "Approved");

  const { error, data, isFetching } = useQuery({
    queryKey: ["get-est-service-info", searchParams.toString()],
    queryFn: () => fetcher(`/get-est-service-info?${searchParams.toString()}`),
  });

  const {
    error: servicesError,
    data: servicesData,
    isFetching: servicesLoading,
  } = useQuery({
    queryKey: ["est-service-info-by-caf-id", cafId],
    queryFn: () => fetcher(`/est-service-info-by-caf-id?cafId=${cafId}`),
    enabled: cafId ? true : false,
  });

  const handleLimit = (val) => {
    searchParams.set("limit", val);
    setSearchParams(searchParams);
  };
  return (
    <>
      {isFetching && <LoadingSpinner />}
      {error && <ErrorAlert error={error} />}
      {!isFetching && data && (
        <Accordion className="accordion accordion-flush">
          {data?.data?.map((item, index) => {
            return (
              <div key={index}>
                <Accordion.Item eventKey={index} onClick={() => setCafId(item.caf_id_no)}>
                  <Accordion.Header className="position-relative">
                    <span className="d-flex align-items-center">
                      <i className="bi bi-card-list"></i>
                      <small>
                        BUSINESS REFERENCE ID <br />
                        <b>{item.caf_id_no}</b>
                      </small>
                    </span>
                    {/* <span className="apply-btm position-absolute end-0">
                      <Link to="" title="Apply Online" className="btn btn-outline-info btn-sm">
                        Apply Online
                      </Link>
                    </span> */}
                  </Accordion.Header>
                  <Accordion.Body>
                    {servicesLoading && <LoadingSpinner />}
                    {servicesError && <ErrorAlert error={servicesError} />}
                    {servicesData && (
                      <table className="table caption-top borderless">
                        <caption>Services under the CAF</caption>
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Service Name</th>
                            <th scope="col">Current Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {servicesData?.map((_item, _index) => {
                            return (
                              <tr key={_index}>
                                <th scope="row">{_index + 1}</th>
                                <td>
                                  {_item.service_name}
                                  <br />
                                  <small className="text-danger">(WBRTPS Timeline: {_item.rtps_timelines})</small>
                                </td>
                                <td>
                                  <span className="badge rounded-pill bg-info mb-1">{_item.status_title}</span>

                                  <ProgressBar
                                    striped={_item.statusPercentage === 100 ? false : true}
                                    variant="success"
                                    now={_item.statusPercentage}
                                    animated={_item.statusPercentage === 100 ? false : true}
                                    style={{ transition: "width 1.5s ease-in-out", height: "0.5rem" }}
                                    className="border"
                                  />

                                  <small className="fw-bold">{_item.statusPercentage}% </small>

                                  <button
                                    className="btn btn-link btn-sm float-end"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasRight"
                                    aria-controls="offcanvasRight"
                                    onClick={() => {
                                      setShow(true);
                                      setCafNo({
                                        cafId: _item.caf_id_no,
                                        serviceId: _item.service_id,
                                        currentStatus: _item.current_status,
                                        service_name: _item.service_name,
                                      });
                                    }}
                                  >
                                    <i className="bi bi-arrow-right-circle-fill"></i> Status Details
                                  </button>
                                </td>
                                <td>
                                  {_item.caf_status === 1 && (
                                    <button className="btn">
                                      <i className="bi bi-trash-fill text-danger"></i>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            );
          })}
        </Accordion>
      )}

      <Pagination data={data} onLimitChange={handleLimit} limit={searchParams.get("limit")} />

      <SelectedServiceDetails show={show} handleClose={handleClose} cafIdServiceID={cafIdServiceID} />
    </>
  );
};

export default ApprovedSelectedServices;
