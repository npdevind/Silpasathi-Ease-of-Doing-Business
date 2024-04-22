import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "./../../../utils/index";
import ErrorAlert from "../../ErrorAlert";
// import LoadingSpinner from "../../LoadingSpinner";

const OwenShipTypeSelect = ({ ...rest }) => {
  const { error, data, isFetching } = useQuery({
    queryKey: ["get-owner-ship-list"],
    queryFn: () => fetcher(`/get-owner-ship-list`),
    keepPreviousData: true,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  return (
    <>
      {error && <ErrorAlert error={error} />}
      {isFetching && <p>Loading...</p>}
      {data && (
        <select aria-label="Default select example" {...rest}>
          <option value="" disabled>
            Select One
          </option>

          {data?.map((item) => (
            <option value={item.id} key={item.id}>
              {item.ownership_name}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default OwenShipTypeSelect;
