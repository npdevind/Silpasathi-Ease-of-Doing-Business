import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../utils";

const AreaTypeSelect = ({ districtCode, ...rest }) => {
  const { data, isFetching } = useQuery({
    queryKey: ["get-area-type", districtCode],
    queryFn: () => fetcher(`/get-area-type?districtCode=${districtCode}`),
    keepPreviousData: true,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    enabled: districtCode ? true : false,
  });

  if (isFetching && !districtCode)
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
        <option value={ele.category} key={index}>
          {ele.category === "C"
            ? "Corporation"
            : ele.category === "B"
            ? "Block"
            : ele.category === "M"
            ? "Municipality"
            : ele.category === "N"
            ? "Notified Area"
            : ele.category === "CB"
            ? "Cantonment Area"
            : ""}
        </option>
      ))}
    </select>
  );
};

export default AreaTypeSelect;
