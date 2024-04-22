import { useQuery } from "@tanstack/react-query";
import { Offcanvas } from "react-bootstrap";
import { fetcher } from "../../../../utils";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ErrorAlert from "../../../../components/ErrorAlert";
import { useEffect, useState } from "react";

const SelectedServiceDetails = ({ show, handleClose, cafIdServiceID }) => {
  const [progressH, setProgressH] = useState(0);
  const { error, data, isFetching } = useQuery({
    queryKey: ["get-service-status-list", cafIdServiceID?.cafId, cafIdServiceID?.serviceId],
    queryFn: () => fetcher(`/get-service-status-list?cafId=${cafIdServiceID?.cafId}&serviceId=${cafIdServiceID?.serviceId}`),
    enabled: show ? true : false,
  });

  useEffect(() => {
    setProgressH(0);
    if (show && data && cafIdServiceID?.currentStatus) {
      const currentStatus = parseInt(cafIdServiceID.currentStatus);
      const totalStatuses = data?.length;
      const progressHeight = (currentStatus / totalStatuses) * 100;
      setProgressH(Math.round(progressHeight));
    }
  }, [show, data, cafIdServiceID?.currentStatus]);

  // console.log(data);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end" name="end" className="offcanvas offcanvas-end status-details">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {/* <h5 className="text-dark m-0">BUSINESS REFERENCE ID : </h5> */}
            <p className="lead m-0 fw-bold">{cafIdServiceID?.cafId}</p>
            <small className="fw-bold lh-1 text-muted">{cafIdServiceID.service_name ? cafIdServiceID.service_name : ""}</small>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="pt-0">
          {isFetching && !data && <LoadingSpinner />}
          {error && <ErrorAlert error={error} />}

          {!isFetching && data && (
            <>
              {/* <h5 className="m-0">
                Service Name : <b className="fw-bold">{cafIdServiceID.service_name ? cafIdServiceID.service_name : ""}</b>
              </h5> */}

              <ul className="caf-status mt-4 mb-4">
                <div className="progress" style={{ transition: "width 1.5s ease-in-out", height: "100%" }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                    role="progressbar"
                    aria-label="Animated striped example"
                    aria-valuenow={progressH}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: "100%", height: `${progressH}%` }}
                  ></div>
                </div>
                {data?.map((item, index) => {
                  return (
                    <li className={item.status_code <= cafIdServiceID.currentStatus ? "active" : ""} key={index}>
                      <p className="lh-1 text-wrap"> {item.status_title}</p>
                      <small className="text-muted">
                        <i>05/03/2024</i>
                      </small>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          <button type="button" className="btn btn-outline-secondary mx-2" disabled={!data}>
            Update Status
          </button>
          <button type="button" className="btn btn-outline-danger" disabled={!data}>
            Need any help?
          </button>

          <button type="button" className="btn btn-secondary position-absolute bottom-0 start-0 end-0 rounded-0 w-100 h-70px" disabled={!data}>
            Click to Proceed
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SelectedServiceDetails;
