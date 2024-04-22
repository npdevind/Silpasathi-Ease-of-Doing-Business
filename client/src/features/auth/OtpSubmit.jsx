import Cookies from "js-cookie";
import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import OtpExpiryMessage from "./OtpExpiryMessage";
import UpdatePassword from "./UpdatePassword";

const OtpInputField = ({ digit, onChange, onKeyDown, inputRef }) => {
  return (
    <div className="col-md-2">
      <input
        type="text"
        placeholder="-"
        value={digit}
        onChange={onChange}
        onKeyDown={onKeyDown}
        maxLength={1}
        ref={inputRef}
        className="form-control"
        style={{ width: "4rem", height: "4rem", textAlign: "center" }}
      />
    </div>
  );
};

const OtpSubmit = ({ show, handleClose, uId }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [chgPass, setChgPass] = useState(false);

  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = e.target.value;
    setOtp(updatedOtp);
    if (index < 5 && e.target.value !== "") {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (parseInt(enteredOtp) === parseInt(Cookies.get("userOTP"))) {
      setChgPass(true);
      Cookies.remove("userOTP");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className="silpasathi_modal" size="lg">
      <Modal.Header closeButton className="border-0 bg-light">
        <Modal.Title>
          {!chgPass ? "Enter OTP" : "Update Password"} {Cookies.get("userOTP")}
        </Modal.Title>
      </Modal.Header>
      {!chgPass ? (
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <OtpExpiryMessage validityDuration={5} handleClose={handleClose} show={show} />
            <div className="container">
              <div className="row">
                {otp.map((digit, index) => (
                  <OtpInputField
                    key={index}
                    digit={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    inputRef={(input) => (inputRefs.current[index] = input)}
                  />
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <button className="btn btn-success rounded" type="submit" disabled={!otp.slice(0, 6).every((element) => element !== "")}>
              Submit
            </button>
          </Modal.Footer>
        </form>
      ) : (
        <Modal.Body>
          <UpdatePassword uId={uId} handleClose={handleClose} />
        </Modal.Body>
      )}
    </Modal>
  );
};

export default OtpSubmit;
