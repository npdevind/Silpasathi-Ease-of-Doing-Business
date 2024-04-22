import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import StaffLogin from "../../features/auth/StaffLogin";
import UserLogin from "../../features/auth/UserLogin";
import loginBg from "../../../public/video/login_bg.mp4";
import logo from "../../../public/images/logo.png";
import OtpSubmit from "../../features/auth/OtpSubmit";

const Login = () => {
  const [show, setShow] = useState(false);
  const [sendOtpFlag, setSendOtpFlag] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSendOtpFlag(false);
  };
  const handleShow = () => setShow(true);

  let { type } = useParams();

  useEffect(() => {
    if (!type) type = "user";
  }, [type]);

  useEffect(() => {
    if (sendOtpFlag) handleShow();
  }, [sendOtpFlag]);

  return (
    <>
      {sendOtpFlag && <OtpSubmit show={show} handleClose={handleClose} uId={sendOtpFlag.uId} />}

      {type === "staff" && <StaffLogin type={type} loginBg={loginBg} logo={logo} setSendOtpFlag={setSendOtpFlag} />}
      {type === "user" && <UserLogin type={type} loginBg={loginBg} logo={logo} setSendOtpFlag={setSendOtpFlag} />}
    </>
  );
};

export default Login;
