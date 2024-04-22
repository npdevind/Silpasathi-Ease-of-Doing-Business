import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const OverlayToolTip = ({ body, msg }) => {
  const addDots = {
    whiteSpace: "nowrap",
    width: "18rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginBottom: "-5px",
  };
  return (
    <>
      <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 50 }} overlay={<Tooltip id="button-tooltip">{msg}</Tooltip>}>
        <div style={addDots}>{body}</div>
      </OverlayTrigger>
    </>
  );
};

export default OverlayToolTip;
