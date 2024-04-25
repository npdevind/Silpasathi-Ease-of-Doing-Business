import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const SelectedServices = ({ checkedItems }) => {
  const renderTooltip = (msg) => <Tooltip id="button-tooltip">{msg}</Tooltip>;
  return (
    <>
      Selected Service :{/* <span className="d-flex gap-2"> */}
      <div className="row">
        {checkedItems.map((item, index) => {
          return (
            <div className="col-md-4 mb-3" key={index}>
              <div className="d-flex">
                <OverlayTrigger placement="top" delay={{ show: 50, hide: 50 }} overlay={renderTooltip(item)}>
                  <div
                    className="tag"
                    style={{ whiteSpace: "nowrap", width: "20rem", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "-5px" }}
                  >
                    <span>{item}</span>
                  </div>
                </OverlayTrigger>

                {/* <button className="btn btn-sm text-danger">
                  <i className="bi bi-eraser-fill"></i>
                </button> */}
              </div>
            </div>
          );
        })}
      </div>
      {/* </span> */}
    </>
  );
};

export default SelectedServices;
