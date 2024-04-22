import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetcher } from "../../utils";
import { Badge } from "react-bootstrap";
import ErrorAlert from "../../components/ErrorAlert";
import LoadingSpinner from "../../components/LoadingSpinner";
import Pagination from "./../../components/Pagination";
import UnitPagination from "../../components/UnitPagination";

const Establishment = () => {
  const MAX_CHARACTERS = 20;
  const [searchParams, setSearchParams] = useSearchParams();

  const { error, data, isFetching } = useQuery({
    queryKey: ["get-establishment-list", searchParams.toString()],
    queryFn: () => fetcher(`/get-establishment-list?${searchParams.toString()}`),
    // enabled: searchParams.toString() ? true : false,
  });

  const handleLimit = (val) => {
    searchParams.set("limit", val);
    setSearchParams(searchParams);
  };

  return (
    <>
      <div>
        <div className="col">
          <div className="card mb-4 border-2 border-dashed unit-area">
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <i className="bi bi-plus-circle-dotted fs-1"></i>
              <h4>
                Please add <b>Unit / Entrepreneur</b> to avail services
              </h4>
              <Link to="/unit/add">
                <button type="button" className="btn btn-info">
                  Add Units / Entrepreneur
                </button>
              </Link>
            </div>
          </div>
        </div>
        {error && <ErrorAlert error={error} />}
        {isFetching && <LoadingSpinner />}
        <div className="row row-cols-1 row-cols-md-5 align-items-md-center">
          {data &&
            data?.data?.map((item, index) => {
              return (
                <div className="col unit-box mb-4" key={index}>
                  <div className="card p-3 border-2 border d-block">
                    <small className="position-absolute add-service">
                      <b className="badge rounded-pill bg-success">3</b> service added
                    </small>
                    <Link href="#" className="text-secondary lh-sm">
                      <i className="bi bi-plus-circle-dotted fs-1"></i> Add More Service
                    </Link>

                    <h5 className="fw-semibold mb-0 text-body-emphasis">{item.est_name}</h5>

                    <small className="text-body-secondary fw-bolder">
                      <span className="text-capitalize">{item.industry_category}</span> | {item.ownership_name}
                    </small>
                    <p className="text-body-secondary fw-light">
                      <i className="bi bi-geo-alt"></i>{" "}
                      {item.address.length > MAX_CHARACTERS ? item.address.substring(0, MAX_CHARACTERS) + "..." : item.address}
                    </p>

                    <div className="d-flex justify-content-md-between">
                      <small className="text-body-secondary fw-semibold">
                        <i className="bi bi-calendar3"></i> 12/01/2024
                      </small>
                      <Link href="#">
                        <Badge pill bg="secondary" style={{ letterSpacing: "1px" }}>
                          <i className="bi bi-pencil-square"></i> Details
                        </Badge>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <UnitPagination data={data} onLimitChange={handleLimit} limit={searchParams.get("limit")} />
      </div>
    </>
  );
};

export default Establishment;
