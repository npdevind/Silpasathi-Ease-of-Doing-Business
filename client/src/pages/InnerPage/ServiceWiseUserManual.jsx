import React, { useState } from "react";
import DocumentTitle from "../../components/DocumentTitle";
import InnerPageHead from "../../layout/InnerPageHead";
import { useQuery } from "@tanstack/react-query";
import { noAuthFetcher } from "../../utils";
import OffCanvasPdfViewer from "../../components/pdfViewer/OffCanvasPdfViewer";
import TableList from "../../components/list/TableList";

const ServiceWiseUserManual = () => {
  const [showPdf, setShowPdf] = useState(false);
  const [spmID, setSpmID] = useState();

  //offcanvas show/hide
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  //fetch data from server
  const { error, data, isFetching } = useQuery({
    queryKey: ["get-service-wise-user-manual"],
    queryFn: () => noAuthFetcher(`/get-service-wise-user-manual`),
  });

  const setPdfData = (id) => {
    setSpmID(id);
    setShowPdf(true);
  };

  //fetch data from server when click any pdf
  const {
    error: pdfError,
    data: pdfData,
    isFetching: pdfIsLoading,
  } = useQuery({
    queryKey: ["service-wise-user-manual-pdf-data", spmID],
    queryFn: () => noAuthFetcher(`/service-wise-user-manual-pdf-data?spmID=${spmID}`),
    enabled: showPdf,
  });

  //console.log(data);

  const columns = [
    {
      field: 0,
      headerName: "SL. No.",
    },

    {
      field: "directoarte_name",
      headerName: "Department/Directorate/District Administration",
    },
    {
      field: "service_name",
      headerName: "Service Name",
    },
    {
      field: 1,
      headerName: "View/Download",
      renderHeader: (item) => {
        return (
          <div
            className="btn btn-outline-white border-0 text-danger fs-3 p-0"
            onClick={() => {
              setPdfData(item.spmId);
              setShow(true);
            }}
          >
            {item.spmId === spmID && pdfIsLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <i className="bi bi-file-earmark-pdf-fill"></i>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DocumentTitle title={"List of Services Wise User Manual"} />
      <InnerPageHead />

      <div className="inner-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="panel-header">List of Services Wise User Manual</div>

              <TableList data={data} isLoading={isFetching} error={error} tableHeader={columns} handlePagination="" pageLimit="" />
              {/* {isFetching && <LoadingSpinner />}
              {!isFetching && error && <ErrorAlert message={error} />}
              {data && (
                <div className="table-responsive all_establishment">
                  <table
                    className="table table-bordered table-striped"
                    width="100%"
                    height="auto"
                  >
                    <thead>
                      <tr>
                        <th>SL. No.</th>
                        <th>Department/Directorate/District Administration</th>
                        <th>Service Name</th>
                        <th>View/Download</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.directoarte_name}</td>
                            <td>
                              <span className="text-danger">*</span>
                              {item.service_name}
                            </td>
                            <td className="text-center ">
                              <div
                                className="btn btn-outline-white border-0 text-danger fs-3 p-0"
                                onClick={() => {
                                  setPdfData(item.spmId);
                                  setShow(true);
                                }}
                              >
                                {item.spmId === spmID && pdfIsLoading ? (
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                ) : (
                                  <i className="bi bi-file-earmark-pdf-fill"></i>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>

      {pdfData && <OffCanvasPdfViewer show={show} handleClose={handleClose} fileData={pdfData} error={pdfError} />}
    </>
  );
};

export default ServiceWiseUserManual;
