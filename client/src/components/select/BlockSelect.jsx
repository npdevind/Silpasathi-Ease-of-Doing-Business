import { useQuery } from "@tanstack/react-query";

import { fetcher } from "../../utils";
import ErrorAlert from "../ErrorAlert";

const BlockSelect = ({ districtCode, areaType, ...rest }) => {
  const { error, data, isFetching } = useQuery({
    queryKey: ["get-block-list", districtCode, areaType],
    queryFn: () => fetcher(`/get-block-list?districtCode=${districtCode}&areaType=${areaType}`),
    keepPreviousData: true,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    enabled: areaType ? true : false,
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
        <option value={ele.bmc_code} key={index}>
          {ele.bmc_name}
        </option>
      ))}
    </select>
  );
};

export default BlockSelect;
