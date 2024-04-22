import React from "react";
import NoDataFound from "./NoDataFound";
import LoadingSpinner from "../LoadingSpinner";
import ErrorAlert from "../ErrorAlert";

const TableList = (props) => {
  const {
    isLoading,
    error,
    data,
    tableHeader,
    // disablePagination = false,
    // pageLimit,
    handlePagination,
    // errorMessage = "",
  } = props;

  const wrapStyle = {
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorAlert error={error} />}
      {!error &&
        !isLoading &&
        // data should be an object with key as data and value as an array of objects. Eg : { data: [{},{},{},.....]}
        (data?.length > 0 ? (
          <>
            <div className="table-responsive all_establishment">
              <table
                className="table table-bordered table-striped"
                width="100%"
                height="auto"
              >
                <thead>
                  <tr>
                    {tableHeader.map((col, index) => {
                      return (
                        <th key={index} scope="col">
                          {col.headerName}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index) => {
                    return (
                      <tr key={item?.id ?? index}>
                        {tableHeader.map((col, indexCol) => {
                          if (col.field === 0) {
                            //if field = 0 then indexing
                            return (
                              <td key={indexCol} style={wrapStyle}>
                                {handlePagination
                                  ? data.from + index
                                  : 1 + index}
                              </td>
                            );
                          } else if (col.renderHeader && col.field !== 1) {
                            //if renderHeader function is present then param will be the one given in field
                            return (
                              <td key={indexCol} style={wrapStyle}>
                                {col.renderHeader({
                                  [col.field]: item[col.field],
                                  key: item?.id ?? index,
                                })}
                              </td>
                            );
                          } else if (col.renderHeader && col.field === 1) {
                            //if field = 1 then it should have renderHeader function and param will be the entire object
                            return (
                              <td key={indexCol} style={wrapStyle}>
                                {col.renderHeader({
                                  ...item,
                                  key: item?.id ?? index,
                                })}
                              </td>
                            );
                          }
                          return (
                            <td key={indexCol} style={wrapStyle}>
                              {item[col.field]}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <NoDataFound />
        ))}
      {/* {!disablePagination && <Pagination data={data} onLimitChange={handlePagination} limit={pageLimit} />} */}
    </>
  );
};

export default TableList;
