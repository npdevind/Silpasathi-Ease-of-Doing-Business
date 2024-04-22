import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const MenuBar = () => {
  const menuArray = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "About",
      link: "",
      submenu: [
        { label: "About Silpasathi", link: "/about-silpasathi" },
        { label: "Advantage West Bengal", link: "" },
        { label: "Role of Silpasathi Portal", link: "" },
        { label: "List of Department Wise Services", link: "" },
        {
          label: "List of Services Wise User Manual",
          link: "/service-wise-user-manual",
        },
        { label: "Administration Committee", link: "" },
        { label: "Service Delivery Timeline", link: "" },
      ],
    },
    {
      label: "Know your Compliances",
      link: "",
      submenu: [
        { label: "Setting Up Business", link: "" },
        { label: "Pre - Establishment Approvals", link: "" },
        { label: "Pre - Operation Approvals", link: "" },
        { label: "Fees Procedure and Checklist", link: "" },
        { label: "Timelines", link: "" },
        { label: "Duties and Levies", link: "" },
        { label: "Fees Structure", link: "" },
      ],
    },
    {
      label: "Acts & Rules",
      link: "",
      submenu: [
        { label: "Master List", link: "" },
        { label: "Simplified Version", link: "" },
        { label: "Single Window System Act 2017", link: "" },
        { label: "Single Window System Rules 2017", link: "" },
        { label: "Notifications / Circulars / Orders", link: "" },
      ],
    },
    {
      label: "e-Services",
      link: "/eodb-e-services",
    },
    {
      label: "Incentives/ Subsidies/ Schemes",
      link: "",
    },
    {
      label: "GIS Map",
      link: "",
    },
    {
      label: "News",
      link: "https://www.nsws.gov.in/",
    },
    {
      label: "sector Specific Licenses",
      link: "",
      submenu: [
        { label: "Green Fire Cracker", link: "" },
        { label: "Hotel Industry(up to 3 star)", link: "" },
      ],
    },
    {
      label: "contact Us",
      link: "",
      submenu: [
        { label: "Feedback", link: "" },
        { label: "Help Desk", link: "" },
        { label: "Contact Us", link: "" },
      ],
    },
  ];

  return (
    <>
      <div id="fixed-menu" className="menu wow fadeIn">
        <Navbar expand="lg" className="navbar-nav">
          <Container>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto navbar-nav">
                {menuArray.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.submenu ? (
                        <NavDropdown
                          title={item.label}
                          id="collapsible-nav-dropdown"
                          renderMenuOnMount={true}
                          className="nav-item"
                        >
                          {item.submenu.map((item_, index_) => (
                            <NavDropdown.Item
                              key={index_}
                              href={item_.link}
                              className="nav-item dropdown"
                            >
                              {item_.label}
                            </NavDropdown.Item>
                          ))}
                        </NavDropdown>
                      ) : (
                        <Link className="nav-link" to={item.link}>
                          {item.label}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default MenuBar;
