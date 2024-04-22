import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetcher } from "../../utils";
import ErrorAlert from "./../ErrorAlert";
import LoadingSpinner from "./../LoadingSpinner";

const DepartmentSelect = ({ ...rest }) => {
  const { error, data, isFetching } = useQuery({
    queryKey: ["get-eodb-department-list"],
    queryFn: () => fetcher(`/get-eodb-department-list`),
    keepPreviousData: true,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  return (
    <>
      {error && <ErrorAlert error={error} />}
      {isFetching && <LoadingSpinner />}
      {data && (
        <select aria-label="Default select example" {...rest}>
          <option value="" disabled>
            Select One
          </option>
          {rest.option_all == "true" ? <option value="0">ALL</option> : ""}
          {data?.map((item) => (
            <option value={item.dept_id} key={item.dept_id}>
              {item.department_name}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default DepartmentSelect;
