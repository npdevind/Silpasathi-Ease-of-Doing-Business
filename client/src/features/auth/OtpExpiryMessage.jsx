import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const OtpExpiryMessage = ({ validityDuration, show, handleClose }) => {
  const [timer, setTimer] = useState(validityDuration * 60);

  useEffect(() => {
    let interval;
    if (timer > 0 && show) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleClose();
      // Remove OTP from the cookie when it expires
      Cookies.remove("userOTP");
    }
    return () => clearInterval(interval);
  }, [timer, show, handleClose]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
  };

  // Calculate expiry time
  const expiryTime = formatTime(timer);

  return (
    <div className="d-flex justify-content-md-center">
      <small className="d-inline-flex mb-3 px-2 py-1 fw-semibold text-success bg-success bg-opacity-10 border border-success border-opacity-10 rounded-2 ">
        OTP is valid till: {expiryTime}. Please complete your action before the OTP expires.
      </small>
    </div>
  );
};

export default OtpExpiryMessage;
