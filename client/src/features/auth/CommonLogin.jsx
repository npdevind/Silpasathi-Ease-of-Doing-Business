// CommonLogin.jsx
import React, { useEffect, useState } from "react";
import FooterBottom from "../../layout/FooterBottom";
import { useValidate } from "../../hooks";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/userSlice";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const CommonLogin = ({ type, loginBg, logo, setSendOtpFlag }) => {
  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [num1] = useState(Math.floor(Math.random() * 20));
  const [num2] = useState(Math.floor(Math.random() * 20));

  const [form, validator] = useValidate({
    username: { value: "", validate: "required" },
    password: { value: "", validate: "required" },
    captcha: { value: "", validate: "required" },
    userType: { value: type, validate: "" },
  });

  const handleChange = (e) => {
    validator.validOnChange(e);
  };

  const checkCaptcha = (e) => {
    const answer = num1 + num2;
    if (parseInt(e.target.value) !== parseInt(answer)) {
      validator.setState((state) => {
        state.captcha.error = "Invalid answer.";
        return {
          ...state,
        };
      });
    } else {
      validator.setState((state) => {
        state.captcha.error = null;
        return {
          ...state,
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validator.validate()) return;
    const formData = validator.generalize();
    setLoading(true);
    try {
      const res = await fetch(process.env.APP_BASE_API + "/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.sendOtpFlag) {
          setSendOtpFlag({ status: true, uId: data.userId });
          const expiryDate = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes from now
          Cookies.set("userOTP", data?.genOtp, { expires: expiryDate });
        } else {
          localStorage.clear();
          dispatch(login({ ...data.user, token: data.token }));
          toast.success("Welcome Onboard");
          localStorage.setItem("silpasathiToken", data.token);
          navigate("/dashboard");
        }

        setLoading(false);
      } else {
        const data = await res.json();
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  const onFocus = () => {
    setToken(localStorage.getItem("silpasathiToken"));
  };
  useEffect(() => {
    window.addEventListener("focus", onFocus);
    onFocus();
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);
  if (token) return <Navigate to="/dashboard" />;

  const toggleNew = () => {
    setVisible(!isVisible);
  };

  const eye = {
    float: "right",
    marginTop: "-39px",
    marginRight: "6px",
  };

  return (
    <>
      <video autoPlay muted loop id="myVideo">
        <source src={loginBg} type="video/mp4" />
      </video>
      <div className="login-content">
        <div className="row d-flex flex-row-reverse">
          <div className="login col-auto ">
            <div className="login-logo text-center">
              <Link to={process.env.BASE_PATH}>
                <img src={logo} alt="logo" />
                <h1>Silpasathi</h1>
                <h4>State Single Window Portal for Industries</h4>
              </Link>
            </div>
            <div className="region region-content">
              <div id="block-system-main" className="block block-system">
                <div className="content">
                  <div
                    className="card"
                    style={{
                      width: "32rem",
                      height: "35rem",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-center">
                        {type === "user" && <strong>Sign in to Continue</strong>}
                        {type === "staff" && <strong>Admin Sign in to Continue</strong>}
                      </h5>

                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-12">
                            <input
                              className={`form-control ${form.username.error && "is-invalid"}`}
                              type="text"
                              placeholder="User name"
                              id="username"
                              name="username"
                              onChange={(e) => handleChange(e.currentTarget)}
                              value={form.username.value}
                            />
                            <div className="invalid-feedback">{form.username.error && "Please enter your username"}</div>
                          </div>

                          <div className="col-md-12">
                            <input
                              className={`form-control ${form.password.error && "is-invalid"}`}
                              type={isVisible ? "name" : "password"}
                              placeholder="Password"
                              id="password"
                              name="password"
                              onChange={(e) => handleChange(e.currentTarget)}
                              value={form.password.value}
                            />
                            <span className="icon" onClick={toggleNew} style={eye}>
                              {isVisible ? <i className="bi bi-eye"></i> : <i className="fa-solid bi bi-eye-slash"></i>}
                            </span>
                            <div className="invalid-feedback">{form.password.error && "Please enter your password"}</div>
                          </div>

                          <div className="col-md-4">
                            {num1} + {num2} =
                          </div>

                          <div className="col-md-8">
                            <input
                              className={`form-control ${form.captcha.error && "is-invalid"}`}
                              type="text"
                              placeholder="captcha"
                              id="captcha"
                              name="captcha"
                              onKeyUp={checkCaptcha}
                              value={form.captcha.value}
                              onChange={(e) => handleChange(e.currentTarget)}
                            />
                            <div className="invalid-feedback">{form.captcha.error && form.captcha.error}</div>
                          </div>

                          <div className="col-12">
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                              {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Login
                            </button>
                          </div>
                        </div>
                      </form>

                      <div className="row">
                        <button className="btn brn-light">Forgot password?</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterBottom />
    </>
  );
};

export default CommonLogin;
