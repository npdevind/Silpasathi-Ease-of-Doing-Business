import React from "react";

const ErrorAlert = ({ error }) => {
    return (
        <>
            <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-circle-fill text-danger"></i> {error.message}
            </div>
        </>
    );
};

export default ErrorAlert;
