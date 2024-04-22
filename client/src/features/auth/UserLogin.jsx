import React from "react";
import CommonLogin from "./CommonLogin";

const UserLogin = ({ type, loginBg, logo, setSendOtpFlag }) => {
  return <CommonLogin type={type} loginBg={loginBg} logo={logo} setSendOtpFlag={setSendOtpFlag} />;
};

export default UserLogin;
