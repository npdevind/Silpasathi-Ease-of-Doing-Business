import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetcher } from "../../../../utils";

const ServiceStatus = ({ serviceStatus }) => {
  console.log(serviceStatus);
  const { error, data, isFetching } = useQuery({
    queryKey: ["est-service-status", serviceStatus],
    queryFn: () => fetcher(`/est-service-status?serviceId=${serviceStatus}`),
    // enabled: serviceStatus ? true : false,
  });

  return <div>ServiceStatus</div>;
};

export default ServiceStatus;
