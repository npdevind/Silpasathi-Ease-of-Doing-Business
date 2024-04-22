import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ data, onLimitChange, limit }) => {
  return (
    <>
      {data && (
        <div className="row align-items-center" aria-hidden="true">
          <div className="col-md-5 col-sm-12 font-9">
            Showing {data?.from} to {data?.to} of {data?.total_records} Entries
          </div>
          <div className="col-md-7 col-sm-12 mt-2 gap-2 d-flex justify-content-end">
            <nav>
              <ul className="pagination pagination-sm mb-3 ">
                {data?.links?.map((item, index) => (
                  <li className={`page-item ${item.active ? "active" : ""} ${item.disabled ? "disabled" : ""}`} key={index}>
                    <Link to={item.query} className="page-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <select
              className="form-select form-select-sm w-auto"
              defaultValue={limit || 10}
              onChange={(e) => onLimitChange(Number(e.currentTarget.value))}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
