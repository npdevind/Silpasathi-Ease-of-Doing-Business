import React from "react";
import { useSelector } from "react-redux";
import MapTrackUserDashboard from "../features/dashboard/MapTrackUserDashboard";
import InvestorDashboardIndex from "../features/dashboard/investor/InvestorDashboardIndex";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      {user.role === "maptrackuser" && <MapTrackUserDashboard />}
      {user.role === "investor" && <InvestorDashboardIndex />}
    </>
  );
};

export default Dashboard;
