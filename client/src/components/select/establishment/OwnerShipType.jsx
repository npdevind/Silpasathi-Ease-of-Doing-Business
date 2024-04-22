import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetcher } from "../../../utils";

const OwnerShipType = () => {
  const [parents, setParents] = useState([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState("");
  const { error, data, isFetching } = useQuery({
    queryKey: ["get-owner-ship-list"],
    queryFn: () => fetcher(`/get-owner-ship-list`),
    keepPreviousData: true,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      // Filter parents only if data is available
      const parentData = data.filter((item) => item.parentId === 0);
      setSelectedParent("");
      setSelectedChild("");
      setParents(parentData);
    }
  }, [data]);

  const handleParentChange = (e) => {
    const parentId = parseInt(e.target.value);
    setSelectedParent(parentId);
    // Filter children based on selected parent
    const filteredChildren = data.filter((item) => item.parentId === parentId);
    setChildren(filteredChildren);
  };

  const handleChildChange = (e) => {
    setSelectedChild(parseInt(e.target.value));
  };

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          <label>Select Parent:</label>
          <select value={selectedParent} onChange={handleParentChange}>
            <option value="">Select Parent</option>
            {parents.map((parent) => (
              <option key={parent.id} value={parent.id}>
                {parent.name}
              </option>
            ))}
          </select>
          <br />
          {selectedParent && (
            <div>
              <label>Select Child:</label>
              <select value={selectedChild} onChange={handleChildChange}>
                <option value="">Select Child</option>
                {children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OwnerShipType;
