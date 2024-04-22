import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetcher } from "../../utils";
import ErrorAlert from "../ErrorAlert";

const DistrictSelect = ({ ...rest }) => {
  const { error, data, isFetching } = useQuery({
    queryKey: ["get-district-list"],
    queryFn: () => fetcher(`/get-district-list`),
    keepPreviousData: true,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  return (
    <>
      {error && <ErrorAlert error={error} />}
      {isFetching && (
        <>
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </>
      )}
      {data && (
        <select {...rest} aria-label="Default select example">
          <option value="">Select One</option>
          {data?.map((ele, index) => (
            <option value={ele.district_code} key={index}>
              {ele.district_name}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default DistrictSelect;
