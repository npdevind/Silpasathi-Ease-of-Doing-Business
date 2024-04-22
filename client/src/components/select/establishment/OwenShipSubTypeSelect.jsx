import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../utils";
import ErrorAlert from "../../ErrorAlert";

const OwenShipSubTypeSelect = ({ parent_id, ...rest }) => {
  const { error, data, isFetching } = useQuery({
    queryKey: ["get-owner-ship-list", parent_id],
    queryFn: () => fetcher(`/get-owner-ship-list?parentId=${parent_id}`),
    keepPreviousData: true,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  // Render the select only if there are child options available
  if (!data || data.length === 0) {
    return null;
  }

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

export default OwenShipSubTypeSelect;
