import React from "react";

const SelectedServices = () => {
  return (
    <>
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
    </>
  );
};

export default SelectedServices;
