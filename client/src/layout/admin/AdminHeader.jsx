import React from "react";
import userAvt from "../../../public/images/user.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLocation } from "react-router-dom";

const AdminHeader = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <div className="me-5">
          <h1 className="text-dark fw-bold my-1 fs-2">{location.pathname === "/dashboard" ? "Welcome Onboard" : <Breadcrumbs />}</h1>
          <ul className="breadcrumb text-muted fs-6 fw-normal ms-1">
            <li className="breadcrumb-item text-muted">
              <Link to="/dashboard" className="text-muted text-hover-primary">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item text-dark">
              <Breadcrumbs />
            </li>
          </ul>
        </div>
        <div className="d-flex">
          <i className="bi bi-bell p-2 fs-4"></i>
          <div className="dropdown text-start">
            <Dropdown drop={"center"}>
              <Dropdown.Toggle id="dropdown-basic" style={{ background: "transparent", border: "none" }}>
                <div className="float-start">
                  <img src={userAvt} alt="user" width="32" height="32" className="rounded-circle" />
                </div>
                <div className="float-end text-start">
                  <h6 className="text-dark mb-0 fw-semibold">
                    {user?.fname} {user?.mname} {user?.lname}
                  </h6>
                  <span className="small text-secondary">
                    <i className="bi bi-telephone"></i> 9679845202
                  </span>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link className="dropdown-item" to="/change-password">
                    Change Password
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link className="dropdown-item" to="/edit-profile">
                    Profile Information
                  </Link>
                </Dropdown.Item>
                <hr className="dropdown-divider" />
                <Dropdown.Item>
                  <Link
                    className="dropdown-item"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(logout());
                    }}
                  >
                    Sign Out
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
