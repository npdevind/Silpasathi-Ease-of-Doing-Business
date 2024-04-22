import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetcher } from "../../utils";

const ServiceSelect = ({ departmentCode = "", ...rest }) => {
  const { data, isFetching } = useQuery({
    queryKey: ["get-service-list", departmentCode],
    queryFn: () => fetcher(`/get-service-list?departmentCode=${departmentCode}`),
    keepPreviousData: true,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    enabled: departmentCode ? true : false,
  });

  if (isFetching)
    return (
      <>
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </>
    );
  return (
    <select {...rest} aria-label="Default select example">
      <option value="">Select One</option>
      {data?.map((ele, index) => (
        <option value={ele.service_id} key={index}>
          {ele.service_name}
        </option>
      ))}
    </select>
  );
};

export default ServiceSelect;
