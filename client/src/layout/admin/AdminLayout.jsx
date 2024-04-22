import React, { useEffect } from "react";
import { Outlet } from "react-router";
import "../../scss/admin.scss";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../utils";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { refresh } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-dynamic-nav-bar"],
    queryFn: () => fetcher(`/admin-dynamic-nav-bar`),
  });

  //logout from current page if logout from any other page
  const onFocus = () => {
    dispatch(refresh());
  };
  useEffect(() => {
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return (
    <>
      <main className="d-flex flex-nowrap p-3">
        <AdminSidebar data={data} isLoading={isLoading} error={error} />
        <section className="d-flex flex-column dashboard-content p-4 pt-0 overflow-hidden">
          <AdminHeader />
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default AdminLayout;
