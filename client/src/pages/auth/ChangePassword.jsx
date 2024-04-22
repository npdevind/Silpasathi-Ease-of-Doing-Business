import React, { useState } from "react";
import { useValidate } from "../../hooks";
import { ProgressBar } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { fetcher, updater } from "../../utils";
import { toast } from "react-toastify";
import { logout } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [form, validator] = useValidate({
    current_pass: { value: "", validate: "required" },
    password: { value: "", validate: "required" },
    confirm_password: { value: "", validate: "required|confirm_password" },
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (evt) => {
    validator.validOnChange(evt, async (value, name, setState) => {
      switch (name) {
        case "password":
          setState((state) => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*&#])[A-Za-z\d@!%*&#]{8,}$/;
            if (!regex.test(value)) {
              state.password.required = true;
              state.password.validate = "required";
              state.password.error =
                "Password must be at least eight characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@!%*&).";
            } else {
              state.password.required = false;
              state.password.validate = "";
              state.password.error = null;
            }
            return { ...state };
          });
          break;
      }
    });
  };

  const onkeyup = (e) => {
    const password = e.value;
    let strength = 0;

    // Check for length
    if (password.length >= 8) strength += 1;

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) strength += 1;

    // Check for lowercase letters
    if (/[a-z]/.test(password)) strength += 1;

    // Check for numbers
    if (/\d/.test(password)) strength += 1;

    // Check for special characters
    if (/[@!%*&#]/.test(password)) strength += 1;

    // Update password strength
    setPasswordStrength(strength);
  };

  const { mutate: checkOldPass, isPending: checkOldPassLoading } = useMutation({
    mutationFn: (currentPass) => fetcher(`/check-user-old-pass?pass=${currentPass}`),
  });
  const handleBlur = (e) => {
    // By using encodeURIComponent(), you ensure that special characters like # are properly encoded before being appended to the URL.
    checkOldPass(encodeURIComponent(e), {
      onSuccess(data, variables, context) {
        validator.setState((state) => {
          state.current_pass.success = data.message;
          state.current_pass.error = null;
          return {
            ...state,
          };
        });
      },
      onError(error, variables, context) {
        validator.setState((state) => {
          state.current_pass.success = null;
          state.current_pass.error = error.message;
          return {
            ...state,
          };
        });
      },
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({ body, method, url }) => updater({ url: url, method: method || "POST", body: body }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.validate()) return;
    const data = validator.generalize();
    mutate(
      { url: `/change-user-password`, body: data },
      {
        onSuccess(data, variables, context) {
          toast.success(data.message);
          dispatch(logout());
        },
        onError(error, variables, context) {
          toast.error(error.message);
          validator.setError(error.errors);
        },
      }
    );
  };

  return (
    <>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="current_pass">Current Password {form.current_pass.required && <span className="text-danger">*</span>}</label>
                <input
                  type="password"
                  className={`form-control ${form.current_pass.error ? "is-invalid" : form.current_pass?.success && "is-valid"}`}
                  id="current_pass"
                  name="current_pass"
                  value={form.current_pass.value}
                  onChange={(e) => {
                    handleChange(e.currentTarget);
                    handleBlur(e.currentTarget.value);
                  }}
                />
                {checkOldPassLoading && (
                  <span className="valid-feedback spinner-border spinner-border-sm lh-6" role="status" aria-hidden="true"></span>
                )}
                {!checkOldPassLoading && (
                  <div id="Feedback" className={form.current_pass.error ? "invalid-feedback" : form.current_pass?.success ? "valid-feedback" : ""}>
                    {form.current_pass.error ? form.current_pass.error : form.current_pass?.success && form.current_pass?.success}
                  </div>
                )}
              </div>

              <div className="col-md-4">
                <label htmlFor="password">New Password {form.password.required && <span className="text-danger">*</span>}</label>
                <input
                  type="password"
                  className={`form-control ${form.password.error && "is-invalid"} mb-2`}
                  id="password"
                  name="password"
                  value={form.password.value}
                  onChange={(e) => {
                    handleChange(e.currentTarget);
                    onkeyup(e.currentTarget);
                  }}
                />

                <div>
                  <ProgressBar
                    striped={passwordStrength === 5 ? false : true}
                    variant={
                      passwordStrength === 5
                        ? "success"
                        : passwordStrength === 4
                        ? "primary"
                        : passwordStrength === 3
                        ? "info"
                        : passwordStrength === 2
                        ? "warning"
                        : "danger"
                    }
                    now={passwordStrength * 20}
                    animated={passwordStrength === 5 ? false : true}
                    style={{ transition: "width 1.5s ease-in-out", height: "0.5rem", marginTop: "-8px" }}
                    className="border"
                  />
                </div>
                <div id="Feedback" className="invalid-feedback">
                  {form.password.error}
                </div>
              </div>

              <div className="col-md-4 mb-2">
                <label htmlFor="confirm_password">Confirm Password {form.confirm_password.required && <span className="text-danger">*</span>}</label>
                <input
                  type="password"
                  className={`form-control ${form.confirm_password.error && "is-invalid"}`}
                  id="confirm_password"
                  name="confirm_password"
                  value={form.confirm_password.value}
                  onChange={(e) => handleChange(e.currentTarget)}
                />
                <div id="Feedback" className="invalid-feedback">
                  {form.confirm_password.error}
                </div>
              </div>
              {/* <div className="col-md-12">
                  <p className="text-danger fst-italic lh-1 font-monospace" style={{ fontSize: "12.5px" }}>
                    Note: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character(@!%*&).
                  </p>
                </div> */}
            </div>
          </div>
          <div className="card-footer ">
            <div className="d-flex justify-content-md-end">
              <button className="btn btn-sm btn-success " type="submit" disabled={isPending}>
                {isPending && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
