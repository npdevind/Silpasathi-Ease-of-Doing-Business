import { useQuery } from "@tanstack/react-query";

import { fetcher } from "../../utils";
import ErrorAlert from "../ErrorAlert";

const GpWardSelect = ({ blockCode, ...rest }) => {
  const { error, data, isFetching } = useQuery({
    queryKey: ["get-gp-ward-list", blockCode],
    queryFn: () => fetcher(`/get-gp-ward-list?blockCode=${blockCode}`),
    keepPreviousData: true,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    enabled: blockCode ? true : false,
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
      <select {...rest} aria-label="Default select example" value={rest.value ? rest.value : ""}>
        <option value="">Select One</option>
        {data?.map((ele, index) => (
          <option value={ele.gp_ward_code} key={index}>
            {ele.gp_ward_name}
          </option>
        ))}
      </select>
    </>
  );
};

export default GpWardSelect;
