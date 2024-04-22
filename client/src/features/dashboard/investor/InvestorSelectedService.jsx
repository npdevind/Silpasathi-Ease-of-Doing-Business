import OnGoingSelectedServices from "./serviceTabs/OnGoingSelectedServices";
import ApprovedSelectedServices from "./serviceTabs/ApprovedSelectedServices";
import RejectedSelectedServices from "./serviceTabs/RejectedSelectedServices";
import { Badge, Tab, Tabs } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../utils";
import { useSearchParams } from "react-router-dom";

const InvestorSelectedService = () => {
  const { data } = useQuery({
    queryKey: ["get-est-service-count"],
    queryFn: () => fetcher(`/get-est-service-count`),
  });
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const clearSearchParams = (e) => {
    setSearchParams();
  };

  return (
    <>
      <div className="row mb-4">
        <h2 className="m-0">Your Selected Service(s) </h2>
        <p className="text-body-secondary">
          <i>
            If any applications not submitted post <b className="text-danger">90 days</b> days would be removed from the system
          </i>
        </p>

        <div className="caf-tab position-relative">
          <div className="position-absolute end-0">
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search CAF" aria-label="Search" />
              <button className="btn btn-success" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
          <Tabs
            defaultActiveKey="On Going"
            id="ex1"
            role="tablist"
            onSelect={(e) => {
              clearSearchParams(e);
            }}
          >
            <Tab
              eventKey="On Going"
              title={
                <>
                  {"Pending"}{" "}
                  <Badge pill bg="info">
                    {data && data[0]?.total_pending}
                  </Badge>
                </>
              }
            >
              <OnGoingSelectedServices />
            </Tab>
            <Tab
              eventKey="Approved"
              title={
                <>
                  {"Approved"}{" "}
                  <Badge pill bg="success">
                    {data && data[0]?.total_approved}
                  </Badge>
                </>
              }
            >
              <ApprovedSelectedServices />
            </Tab>
            <Tab
              eventKey="Rejected"
              title={
                <>
                  {"Rejected"}{" "}
                  <Badge pill bg="danger">
                    {data && data[0]?.total_rejected}
                  </Badge>
                </>
              }
            >
              <RejectedSelectedServices />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default InvestorSelectedService;
