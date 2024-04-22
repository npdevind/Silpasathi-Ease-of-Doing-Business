import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import wbLogo from "../../../public/images/logo.png";

const AdminSidebar = ({ data, isLoading, error }) => {
  const user = useSelector((state) => state.user.user);
  const [show, setShow] = useState(-1);

  return (
    <>
      <nav className="sidebar flex-shrink-0 p-3">
        <Link to="/dashboard" className="d-flex flex-column align-items-center mb-5 text-center">
          <img
            src={wbLogo}
            className="img-fluid"
            alt="Silpasathi || State Single Window Portal for Industries || Ease of Doing Business || Government of West Bengal"
          />
          <div className="dashboard-logo">
            <div className="fs-3 fw-semibold lh-1 text-white">Silpasathi</div>
            <small className="text-white">Government of West Bengal</small>
          </div>
        </Link>

        <ul className="nav nav-pills flex-column mb-auto" id="nav_accordion">
          {data?.menuArray
            .filter((item) => item.access.includes("*") || item.access.includes(user.role))
            .map((item, index) => {
              if (item.links) {
                return <MenuDropDown item={item} setShow={setShow} show={show} index={index} role={user.role} key={index} accessRole="" />;
              } else {
                return (
                  <li key={index} className="nav-item">
                    <NavLink to={item.link} className="nav-link">
                      {item.icon && <i className={item.icon}></i>}{" "}
                      <span>
                        {item.label} <span style={{ fontSize: "12px", color: "#afdb99" }}>{item.subLabel}</span>
                      </span>
                    </NavLink>
                  </li>
                );
              }
            })}
        </ul>
      </nav>
    </>
  );
};

export default AdminSidebar;

const MenuDropDown = ({ item, setShow, show, index, role, tooltip, accessRole, ...rest }) => {
  return (
    <>
      <li {...rest}>
        <Link
          href={item.link}
          onClick={(e) => {
            e.preventDefault();
            setShow((s) => {
              if (s == index) return -1;
              else return index;
            });
          }}
          className="d-flex align-item-start justify-content-between"
        >
          <div>
            {item.icon && <i className={item.icon}></i>}{" "}
            <span>
              {item.label} <span> {item.subLabel}</span>
            </span>
          </div>
          {show == index ? <i className="fa-solid fa-sort-down"></i> : <i className="fa-solid fa-sort-down fa-rotate-270"></i>}
        </Link>

        {show == index && (
          <ul>
            {item.links
              .filter((item) => item.access.includes("*") || item.access.includes(role))
              .map((subItem, index) => (
                <li key={index} className="my-1">
                  <NavLink end to={subItem.link ? item.link + "/" + subItem.link : item.link}>
                    <span>{subItem.label}</span> <span>{subItem.subLabel}</span>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}
      </li>
    </>
  );
};
