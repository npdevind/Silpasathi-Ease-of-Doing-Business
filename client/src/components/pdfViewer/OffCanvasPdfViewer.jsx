import React from "react";
import { Offcanvas } from "react-bootstrap";
import PdfViewer from "./PdfViewer";

const OffCanvasPdfViewer = ({ show, handleClose, fileData, error }) => {
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        backdrop={false}
        scroll={true}
      >
        <Offcanvas.Header closeButton className="bmssy_offcanvas_header">
          <Offcanvas.Title>
            <span style={{ fontFamily: "Poppins" }}></span>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <PdfViewer blob={fileData[0]?.pdf_content?.data} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffCanvasPdfViewer;
