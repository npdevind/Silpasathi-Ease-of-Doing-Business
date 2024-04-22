import React from "react";
import notFoundImg from "../../public/images/404_icon.png";
import { useNavigate } from "react-router";
import DocumentTitle from "./DocumentTitle";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <DocumentTitle title={"Page Not Found"} />
      <section className="inner-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center bg-light p-4">
              <p>
                <img src={notFoundImg} alt="404 not found" />
              </p>

              <h1>
                <strong>Page Not Found</strong>
              </h1>

              <p>The page you are looking for can&apos;t be found</p>
              <p>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => navigate(-1)}
                >
                  <i className="bi bi-arrow-counterclockwise"></i> Go Back
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PageNotFound;
