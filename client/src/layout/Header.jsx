import React from "react";
import Logo from "../../public/images/logo.png";
import { Link } from "react-router-dom";
// import GoogleTranslate from "./GoogleTranslate";

const Header = () => {
  return (
    <>
      <div className="header-top">
        <div className="container-lg">
          <div className="wb-logo-home-desktop">
            <Link href="#">
              <img src={Logo} alt="West Bengal Logo" />
            </Link>
          </div>
          <div className="d-flex justify-content-start">
            <div className="select-lang">{/* <GoogleTranslate /> */}</div>
            <div className="font_setting">
              <button id="btn-decrease" className="font_setting_btn" type="button">
                A-
              </button>
              <button id="btn-orig" className="font_setting_btn" type="button">
                A
              </button>
              <button id="btn-increase" className="font_setting_btn" type="button">
                A+
              </button>
            </div>
            <div className="color_setting">
              <div className="high_contrast_switcher high_contrast_switcher_links">
                <span className="high_contrast_switcher_high">High</span>
                <span className="high_contrast_switcher_normal">Normal</span>
              </div>
            </div>
            <div className="screen_reader">
              <Link href="#">
                <i className="bi bi-volume-up-fill"></i>
              </Link>
            </div>
            <div className="ml-auto">
              <div className="btn btn-sm application_btm mx-2">
                <Link to="/login/user">Apply Online</Link>
              </div>
              <div className="btn btn-sm staff_btm">
                <Link to="/login/staff">Admin Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
