import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetcher } from "../../utils";

const PoliceStationSelect = ({ districtCode, ...rest }) => {
  const { data, isFetching } = useQuery({
    queryKey: ["get-police-station-list", districtCode],
    queryFn: () => fetcher(`/get-police-station-list?districtCode=${districtCode}`),
    keepPreviousData: true,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    enabled: districtCode ? true : false,
  });

  console.log(data);

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
        <option value={ele.police_station_code} key={index}>
          {ele.name_of_police_station}
        </option>
      ))}
    </select>
  );
};

export default PoliceStationSelect;
