import React from "react";

const LoadingSpinner = () => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border m-3 text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;
