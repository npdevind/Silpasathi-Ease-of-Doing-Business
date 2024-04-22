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
            <div className="col-md-4" key={index}>
              <OverlayTrigger placement="top" delay={{ show: 50, hide: 50 }} overlay={renderTooltip(item)}>
                <div
                  className="tag"
                  style={{ whiteSpace: "nowrap", width: "20rem", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "-5px" }}
                >
                  <span>{item}</span>
                </div>
              </OverlayTrigger>
            </div>
          );
        })}
      </div>
      {/* </span> */}
    </>
  );
};

export default SelectedServices;
