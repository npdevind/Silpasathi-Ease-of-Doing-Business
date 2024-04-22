import React from "react";
import DocumentTitle from "../../components/DocumentTitle";
import InnerPageHead from "../../layout/InnerPageHead";
import { useQuery } from "@tanstack/react-query";
import { noAuthFetcher } from "../../utils";
import TableList from "../../components/list/TableList";

export const Eservice = () => {
  const { error, data, isFetching } = useQuery({
    queryKey: ["list-e-service-data"],
    queryFn: () => noAuthFetcher(`/list-e-service-data`),
  });

  const columns = [
    {
      field: 0,
      headerName: "SL. No.",
    },

    {
      field: "department_name",
      headerName: "Department/Directorate/District Administration",
    },
    {
      field: "service_name",
      headerName: "Service Name",
    },
    {
      field: 1,
      headerName: "Action",
      renderHeader: (item) => {
        return (
          <>
            {item.published === 1 && (
              <button className="btn btn-sm btn-success">Apply Now</button>
            )}
            {item.published === 0 && (
              <button className="btn btn-sm btn-warning">
                Under Maintenance
              </button>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <DocumentTitle title={"List of e-Services"} />
      <InnerPageHead />
      <div className="inner-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="panel-header">List of e-Services</div>

              <TableList
                data={data}
                isLoading={isFetching}
                error={error}
                tableHeader={columns}
                handlePagination=""
                pageLimit=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
