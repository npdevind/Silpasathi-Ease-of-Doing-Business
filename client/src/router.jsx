import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import About from "./pages/InnerPage/About";
import Home from "./pages/Home";
import ServiceWiseUserManual from "./pages/InnerPage/ServiceWiseUserManual";
import { Eservice } from "./pages/InnerPage/Eservice";
import PageNotFound from "./components/PageNotFound";
import Login from "./pages/auth/Login";
import AuthProvider from "./provider/AuthProvider";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/auth/ChangePassword";
import Establishment from "./pages/establishment/Establishment";
import EstablishmentAdd from "./pages/establishment/EstablishmentAdd";
import AdminLayout from "./layout/admin/AdminLayout";
import AllServices from "./pages/Services/AllServices";
import AddSsoService from "./pages/ssoApplication/AddSsoService";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/about-silpasathi",
    element: <About />,
  },
  {
    path: "/service-wise-user-manual",
    element: <ServiceWiseUserManual />,
  },
  {
    path: "/eodb-e-services",
    element: <Eservice />,
  },
  {
    path: "/login/:type",
    element: <Login />,
  },
  {
    element: <AuthProvider />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
            handle: {
              crumb: () => <span>Dashboard</span>,
            },
          },
          {
            path: "/edit-profile",
            element: <Profile />,
            handle: {
              crumb: () => <span>Profile</span>,
            },
          },
          {
            path: "/change-password",
            element: <ChangePassword />,
            handle: {
              crumb: () => <span>Change Password</span>,
            },
          },

          {
            path: "/unit",
            children: [
              {
                index: true,
                element: <Establishment />,
                handle: {
                  crumb: () => <span>Unit / Entrepreneur</span>,
                },
              },
              {
                path: "add",
                element: <EstablishmentAdd />,
                handle: {
                  crumb: () => <span>Add Unit</span>,
                },
              },
            ],
          },

          {
            path: "/all-services",
            element: <AllServices />,
            handle: {
              crumb: () => <span>All Services</span>,
            },
          },

          {
            path: "/add-sso-service",
            element: <AddSsoService />,
            handle: {
              crumb: () => <span>Add SSO Service</span>,
            },
          },
        ],
      },
    ],
  },
]);

export default router;
