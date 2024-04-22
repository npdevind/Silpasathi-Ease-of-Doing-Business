import React, { useEffect, useState } from "react";
import { useValidate } from "../hooks";
import SalutationSelect from "../components/select/SalutationSelect";
import GenderSelectBySalutation from "../components/select/GenderSelectBySalutation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher, updater } from "../utils";
import LoadingSpinner from "./../components/LoadingSpinner";
import ErrorAlert from "./../components/ErrorAlert";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Profile = () => {
  const [genderValFromSal, setGenderValFromSal] = useState();
  const user = useSelector((state) => state.user.user);
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-eodb-user-details"],
    queryFn: () => fetcher(`/get-eodb-user-details`),
  });

  const [form, validator] = useValidate(
    {
      salutation: { value: "", validate: "required" },
      fName: { value: "", validate: "required" },
      mName: { value: "", validate: "" },
      lName: { value: "", validate: "required" },
      mobile: { value: "", validate: "required|indianPhone" },
      email: { value: "", validate: "required|email" },
      gender: { value: "", validate: "required" },
      is_consultant: { value: "", validate: user?.role === "investor" ? "required" : "" },
      consultant_name: { value: "", validate: "" },
    },
    data,
    true
  );

  useEffect(() => {
    if (genderValFromSal) form.gender.value = genderValFromSal;
  }, [genderValFromSal]);

  const handleChange = (evt) => {
    validator.validOnChange(evt, async (value, name, setState) => {
      switch (name) {
        case "is_consultant":
          setState((state) => {
            if (value === "Y") {
              state.consultant_name.required = true;
              state.consultant_name.validate = "required";
              state.consultant_name.value = "";
              state.consultant_name.error = null;
            } else {
              state.consultant_name.required = false;
              state.consultant_name.validate = "";
              state.consultant_name.value = "";
              state.consultant_name.error = null;
            }
            return { ...state };
          });
          break;
      }
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({ body, method, url }) => updater({ url: url, method: method || "POST", body: body }),
  });
  const query = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.validate()) return;
    const data = validator.generalize();

    mutate(
      { url: `/update-user-profile`, body: data },
      {
        onSuccess(data, variables, context) {
          toast.success(data.message);
          query.invalidateQueries("get-eodb-user-details");
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
        {isLoading && <LoadingSpinner />}
        {error && <ErrorAlert error={error} />}
        {data && (
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <label htmlFor="salutation">Salutation {form.salutation.required && <span className="text-danger">*</span>}</label>
                  <SalutationSelect
                    className={`form-select ${form.salutation.error && "is-invalid"}`}
                    id="salutation"
                    name="salutation"
                    value={form.salutation.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.salutation.error}
                  </div>
                </div>

                <div className="col-md-3 mb-2">
                  <label htmlFor="fName">First Name {form.fName.required && <span className="text-danger">*</span>}</label>
                  <input
                    type="text"
                    className={`form-control ${form.fName.error && "is-invalid"}`}
                    id="fName"
                    name="fName"
                    value={form.fName.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.fName.error}
                  </div>
                </div>

                <div className="col-md-3 mb-2">
                  <label htmlFor="mName">Middle Name {form.mName.required && <span className="text-danger">*</span>}</label>
                  <input
                    type="text"
                    className={`form-control ${form.mName.error && "is-invalid"}`}
                    id="mName"
                    name="mName"
                    value={form.mName.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.mName.error}
                  </div>
                </div>

                <div className="col-md-3 mb-2">
                  <label htmlFor="lName">Last Name {form.lName.required && <span className="text-danger">*</span>}</label>
                  <input
                    type="text"
                    className={`form-control ${form.lName.error && "is-invalid"}`}
                    id="lName"
                    name="lName"
                    value={form.lName.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.lName.error}
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <label htmlFor="mobile">Mobile {form.mobile.required && <span className="text-danger">*</span>}</label>
                  <input
                    type="text"
                    className={`form-control ${form.mobile.error && "is-invalid"}`}
                    id="mobile"
                    name="mobile"
                    value={form.mobile.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.mobile.error}
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <label htmlFor="email">Email {form.email.required && <span className="text-danger">*</span>}</label>
                  <input
                    type="text"
                    className={`form-control ${form.email.error && "is-invalid"}`}
                    id="email"
                    name="email"
                    value={form.email.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.email.error}
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <label htmlFor="gender">Gender {form.gender.required && <span className="text-danger">*</span>}</label>
                  <GenderSelectBySalutation
                    className={`form-select ${form.gender.error && "is-invalid"}`}
                    id="gender"
                    name="gender"
                    value={form.gender.value}
                    onChange={(e) => handleChange(e.currentTarget)}
                    salutation={form.salutation.value}
                    setGenderValFromSal={setGenderValFromSal}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.gender.error}
                  </div>
                </div>

                {["investor"].includes(user?.role) && (
                  <>
                    <div className="col-md-3 mb-2">
                      <label htmlFor="is_consultant"> Is Consultant {form.is_consultant.required && <span className="text-danger">*</span>}</label>
                      <div className="row">
                        <div className="col-sm-2">
                          <div className="form-check">
                            <input
                              type="radio"
                              value="Y"
                              checked={form.is_consultant.value == "Y" ? true : false}
                              onChange={() => handleChange({ name: "is_consultant", value: "Y" })}
                              className={`form-check-input ${form.is_consultant.error && "is-invalid"}`}
                              id="is_consultant_yes"
                              name="radio-stacked"
                            />
                            <label className="form-check-label" htmlFor="is_consultant_yes">
                              Yes
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div className="form-check mb-3">
                            <input
                              checked={form.is_consultant.value == "N" ? true : false}
                              value="N"
                              type="radio"
                              className={`form-check-input ${form.is_consultant.error && "is-invalid"}`}
                              onChange={() => handleChange({ name: "is_consultant", value: "N" })}
                              id="is_consultant_no"
                              name="radio-stacked"
                            />
                            <label className="form-check-label" htmlFor="is_consultant_no">
                              No
                            </label>
                          </div>
                        </div>
                        <div id="Feedback" className="invalid-feedback">
                          Please select
                        </div>
                      </div>
                    </div>

                    {form.is_consultant.value === "Y" && (
                      <div className="col-md-3 mb-2">
                        <label htmlFor="consultant_name">
                          Name Of the Consultant {form.consultant_name.required && <span className="text-danger">*</span>}
                        </label>
                        <input
                          type="text"
                          className={`form-control ${form.consultant_name.error && "is-invalid"}`}
                          id="consultant_name"
                          name="consultant_name"
                          value={form.consultant_name.value}
                          onChange={(e) => handleChange(e.currentTarget)}
                        />
                        <div id="Feedback" className="invalid-feedback">
                          {form.consultant_name.error}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-sm btn-success" type="submit" disabled={isPending}>
                {isPending && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Update
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Profile;
