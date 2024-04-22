import React, { useState } from "react";
import { useValidate } from "../../hooks";
import { useMutation } from "@tanstack/react-query";
import { noAuthUpdater } from "../../utils";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const UpdatePassword = ({ handleClose, uId }) => {
  const [isVisibleNew, setVisibleNew] = useState(false);
  const [isVisibleCon, setVisibleCon] = useState(false);

  const toggleNew = () => {
    setVisibleNew(!isVisibleNew);
  };
  const toggleCon = () => {
    setVisibleCon(!isVisibleCon);
  };

  const [form, validator] = useValidate({
    password: { value: "", validate: "required" },
    confirm_password: { value: "", validate: "required|confirm_password" },
    uId: { value: uId, validate: "" },
  });

  const handleChange = (e) => {
    validator.validOnChange(e);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({ body, method, url }) => noAuthUpdater({ url: url, method: method || "POST", body: body }),
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validator.validate()) return;
    const formData = validator.generalize();
    mutate(
      { url: `/update-user-password`, body: formData },
      {
        onSuccess(data, variables, context) {
          console.log(data);
          toast.success("Password Successfully updated");
          handleClose();
          navigate("/login/staff");
        },
        onError(error, variables, context) {
          toast.error(error.message);
        },
      }
    );
  };

  const eye = {
    float: "right",
    marginTop: "-39px",
    marginRight: "6px",
  };

  return (
    <>
      <div className="card shadow">
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-12">
                <label htmlFor="password">New Password {form.password.required && <span className="text-danger">*</span>}</label>
                <input
                  className={`form-control ${form.password.error && "is-invalid"}`}
                  type={isVisibleNew ? "name" : "password"}
                  placeholder="enter new password"
                  id="password"
                  name="password"
                  onChange={(e) => handleChange(e.currentTarget)}
                  value={form.password.value}
                />
                <span className="icon" onClick={toggleNew} style={eye}>
                  {isVisibleNew ? <i className="bi bi-eye"></i> : <i className="fa-solid bi bi-eye-slash"></i>}
                </span>
                <div className="invalid-feedback">{form.password.error && form.password.error}</div>
              </div>

              <div className="col-md-12">
                <label htmlFor="confirm_password">Confirm Password {form.confirm_password.required && <span className="text-danger">*</span>}</label>
                <input
                  className={`form-control ${form.confirm_password.error && "is-invalid"}`}
                  type={isVisibleCon ? "name" : "password"}
                  placeholder="enter confirm password"
                  id="confirm_password"
                  name="confirm_password"
                  onChange={(e) => handleChange(e.currentTarget)}
                  value={form.confirm_password.value}
                />
                <span className="icon" onClick={toggleCon} style={eye}>
                  {isVisibleCon ? <i className="bi bi-eye"></i> : <i className="fa-solid bi bi-eye-slash"></i>}
                </span>
                <div className="invalid-feedback">{form.confirm_password.error && form.confirm_password.error}</div>
              </div>
            </div>
          </div>
          <div className="card-footer border-0 bg-white mb-1">
            <div className="col-12 d-flex justify-content-end">
              <button className="btn btn-success" type="submit" disabled={isPending}>
                {isPending && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Update Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;
