import CommonLogin from "./CommonLogin";

const StaffLogin = ({ type, loginBg, logo, setSendOtpFlag }) => {
  return <CommonLogin type={type} loginBg={loginBg} logo={logo} setSendOtpFlag={setSendOtpFlag} />;
};

export default StaffLogin;
