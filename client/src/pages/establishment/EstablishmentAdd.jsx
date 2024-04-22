import React, { useEffect, useState } from "react";
import { useValidate } from "../../hooks";
import CategoryOfIndustry from "../../components/select/establishment/CategoryOfIndustry";
import FemaleOwnerShip from "../../components/select/establishment/FemaleOwnerShip";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher, updater } from "../../utils";
import { Cascader } from "antd";
import DistrictSelect from "../../components/select/DistrictSelect";
import AreaTypeSelect from "../../components/select/AreaTypeSelect";
import BlockSelect from "../../components/select/BlockSelect";
import GpWardSelect from "../../components/select/GpWardSelect";
import AsyncSelect from "../../components/select/AsyncSelect";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import PoliceStationSelect from "../../components/select/PoliceStationSelect";
// import OwenShipTypeSelect from "../../components/select/establishment/OwenShipTypeSelect";
// import OwenShipSubTypeSelect from "../../components/select/establishment/OwenShipSubTypeSelect";

const EstablishmentAdd = () => {
  const [form, validator] = useValidate({
    establishment_name: { value: "", validate: "required" },
    category_industry: { value: "", validate: "required" },
    female_ownership: { value: "", validate: "required" },
    ownership_type: { value: "", validate: "required" },
    other_ownership_name: { value: "", validate: "" },
    district: { value: "", validate: "required" },
    areaType: { value: "", validate: "required" },
    block: { value: "", validate: "required" },
    gpWard: { value: "", validate: "required" },
    pinCode: { value: "", validate: "required" },
    postOffice: { value: "", validate: "required" },
    postOfficeCode: { value: "", validate: "" },
    policeStation: { value: "", validate: "required" },
  });

  const { data } = useQuery({
    queryKey: ["get-owner-ship-list"],
    queryFn: () => fetcher(`/get-owner-ship-list`),
  });

  const handleChange = (evt) => {
    validator.validOnChange(evt);
  };

  const [ownerTypeVal, setOwnerTypeVal] = useState();
  const CascaderOwnerTypeChanged = (val) => {
    validator.setState((state) => {
      state.ownership_type.required = true;
      state.ownership_type.validate = "required";
      state.ownership_type.error = null;
      state.ownership_type.value = "";
      return {
        ...state,
      };
    });
    setOwnerTypeVal(val);
  };

  useEffect(() => {
    if (ownerTypeVal && form.ownership_type.value === "") {
      validator.setState((state) => {
        state.ownership_type.value = ownerTypeVal;
        state.ownership_type.validate = "";
        state.ownership_type.error = null;
        return {
          ...state,
        };
      });
      if (ownerTypeVal.includes(7) || ownerTypeVal.includes(19) || ownerTypeVal.includes(15)) {
        validator.setState((state) => {
          state.other_ownership_name.required = true;
          state.other_ownership_name.validate = "required";
          state.other_ownership_name.error = null;
          state.other_ownership_name.value = "";
          return {
            ...state,
          };
        });
      } else {
        validator.setState((state) => {
          state.other_ownership_name.required = false;
          state.other_ownership_name.validate = "";
          state.other_ownership_name.error = null;
          state.other_ownership_name.value = "";
          return {
            ...state,
          };
        });
      }
    } else {
      validator.setState((state) => {
        state.ownership_type.required = true;
        state.ownership_type.validate = "required";
        state.ownership_type.error = null;
        return {
          ...state,
        };
      });
    }
  }, [ownerTypeVal]);

  const autoPopulate = (item) => {
    validator.setState((state) => {
      state.postOffice.value = item.po_name || "";
      state.postOfficeCode.value = item.id || "";
      if (state.postOffice.value) {
        state.postOffice.validate = "";
        state.postOfficeCode.validate = "";
        state.postOffice.error = null;
        state.postOfficeCode.error = null;
      } else {
        state.postOffice.validate = "required";
        state.postOfficeCode.validate = "required";
      }
      return { ...state };
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({ body, method, url }) => updater({ url: url, method: method || "POST", body: body }),
  });
  const query = useQueryClient();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.validate()) return;
    const formData = validator.generalize();

    mutate(
      { url: `/add-new-establishment`, body: formData },
      {
        onSuccess(data, variables, context) {
          toast.success(data.message);
          query.invalidateQueries({ queryKey: ["get-establishment-list"] });
          navigate("/unit");
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
      <div className="card mb-4 inner-area ">
        <div className="card-body d-flex flex-column ">
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <label htmlFor="establishment_name">Unit Name {form.establishment_name.required && <span className="text-danger">*</span>}</label>
                  <input
                    type="establishment_name"
                    className={`form-control ${form.establishment_name.error && "is-invalid"}`}
                    id="establishment_name"
                    name="establishment_name"
                    value={form.establishment_name.value}
                    onChange={(e) => handleChange({ name: "establishment_name", value: e.currentTarget.value })}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.establishment_name.error}
                  </div>
                </div>

                <div className="col-md-3 mb-2">
                  <label htmlFor="category_industry">Select Category Of Industry {form.category_industry.required && <span className="text-danger">*</span>}</label>
                  <CategoryOfIndustry
                    type="category_industry"
                    className={`form-select ${form.category_industry.error && "is-invalid"}`}
                    id="category_industry"
                    name="category_industry"
                    value={form.category_industry.value}
                    onChange={(e) => handleChange({ name: "category_industry", value: e.currentTarget.value })}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.category_industry.error}
                  </div>
                </div>

                <div className="col-md-3 mb-2">
                  <label htmlFor="current_pass">Whether Owner Of Industry Is Female {form.female_ownership.required && <span className="text-danger">*</span>}</label>
                  <FemaleOwnerShip
                    type="female_ownership"
                    className={`form-select ${form.female_ownership.error && "is-invalid"}`}
                    id="female_ownership"
                    name="female_ownership"
                    value={form.female_ownership.value}
                    onChange={(e) => handleChange({ name: "female_ownership", value: e.currentTarget.value })}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.female_ownership.error}
                  </div>
                </div>

                <div className="col-md-3 mb-2">
                  <label htmlFor="ownership_type">Select Ownership Type {form.ownership_type.required && <span className="text-danger">*</span>}</label>
                  <Cascader
                    options={data}
                    onChange={CascaderOwnerTypeChanged}
                    // onClick={CascaderOwnerTypeChanged}
                    placeholder="Please select"
                    style={{ width: "100%", height: "2.4rem" }}
                    status={form.ownership_type.error && "error"}
                    className={form.ownership_type.error && "is-invalid"}
                  />

                  <div id="Feedback" className="invalid-feedback">
                    {form.ownership_type.error}
                  </div>
                </div>

                {(form.ownership_type.value.includes(7) || form.ownership_type.value.includes(19) || form.ownership_type.value.includes(15)) && (
                  <div className="col-md-3 mb-2">
                    <label htmlFor="other_ownership_name">Other Ownership Name {form.other_ownership_name.required && <span className="text-danger">*</span>}</label>
                    <input
                      type="other_ownership_name"
                      className={`form-control ${form.other_ownership_name.error && "is-invalid"}`}
                      id="other_ownership_name"
                      name="other_ownership_name"
                      value={form.other_ownership_name.value}
                      onChange={(e) => handleChange({ name: "other_ownership_name", value: e.currentTarget.value })}
                    />
                    <div id="Feedback" className="invalid-feedback">
                      {form.other_ownership_name.error}
                    </div>
                  </div>
                )}

                <div className="col-md-3 mb-2">
                  <label htmlFor="district">District {form.district.required && <span className="text-danger">*</span>}</label>
                  <DistrictSelect
                    type="district"
                    className={`form-select ${form.district.error && "is-invalid"}`}
                    id="district"
                    name="district"
                    value={form.district.value}
                    onChange={(e) => handleChange({ name: "district", value: e.currentTarget.value })}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.district.error}
                  </div>
                </div>

                <div className="col-md-3 mb-2">
                  <label htmlFor="areaType">Area Type {form.areaType.required && <span className="text-danger">*</span>}</label>
                  <AreaTypeSelect
                    type="areaType"
                    className={`form-select ${form.areaType.error && "is-invalid"}`}
                    id="areaType"
                    name="areaType"
                    value={form.areaType.value}
                    onChange={(e) => handleChange({ name: "areaType", value: e.currentTarget.value })}
                    districtCode={form.district.value}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.areaType.error}
                  </div>
                </div>

                <div className="col-md-3 mb-2">
                  <label htmlFor="current_pass">
                    {form.areaType.value === "C"
                      ? "Corporation"
                      : form.areaType.value === "B"
                      ? "Block"
                      : form.areaType.value === "M"
                      ? "Municipality"
                      : form.areaType.value === "N"
                      ? "Notified Area"
                      : form.areaType.value === "CB"
                      ? "Cantonment Area"
                      : "Area"}{" "}
                    {form.block.required && <span className="text-danger">*</span>}
                  </label>
                  <BlockSelect
                    type="block"
                    className={`form-select ${form.block.error && "is-invalid"}`}
                    id="block"
                    name="block"
                    value={form.block.value}
                    onChange={(e) => handleChange({ name: "block", value: e.currentTarget.value })}
                    districtCode={form.district.value}
                    areaType={form.areaType.value}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.block.error}
                  </div>
                </div>

                <div className="col-md-3 mb-2">
                  <label htmlFor="gpWard">Gp/Ward {form.gpWard.required && <span className="text-danger">*</span>}</label>
                  <GpWardSelect
                    type="gpWard"
                    className={`form-select ${form.gpWard.error && "is-invalid"}`}
                    id="gpWard"
                    name="gpWard"
                    value={form.gpWard.value}
                    onChange={(e) => handleChange({ name: "gpWard", value: e.currentTarget.value })}
                    blockCode={form.block.value}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.gpWard.error}
                  </div>
                </div>

                <div className="col-md-3 mb-2">
                  <label htmlFor="pinCode">Pin Code {form.pinCode.required && <span className="text-danger">*</span>}</label>

                  <AsyncSelect
                    className={form.pinCode.error && "is-invalid"}
                    loadOptions={async (value) => {
                      try {
                        const data = await fetcher("/pincode-suggestion?pinCode=" + value);
                        return data.map((item) => ({
                          ...item,
                          value: `${item.value} ${item.po_name} ${item.district_state}`,
                          key: item.id,
                          setValue: item.value,
                        }));
                      } catch (error) {
                        return [];
                      }
                    }}
                    onItemSubmit={autoPopulate}
                    id="pinCode"
                    value={form.pinCode.value}
                    onChange={(value) => handleChange({ name: "pinCode", value: value })}
                    placeholder="pin code"
                  />

                  <div id="Feedback" className="invalid-feedback">
                    {form.pinCode.error}
                  </div>
                </div>

                <div className="col-md-3 mb-2">
                  <label htmlFor="postOffice">Post Office {form.postOffice.required && <span className="text-danger">*</span>}</label>
                  <input
                    type="postOffice"
                    className={`form-control ${form.postOffice.error && "is-invalid"}`}
                    id="postOffice"
                    name="postOffice"
                    value={form.postOffice.value}
                    onChange={(e) => handleChange({ name: "postOffice", value: e.currentTarget.value })}
                    readOnly
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.postOffice.error}
                  </div>
                </div>

                <div className="col-md-3 mb-2">
                  <label htmlFor="policeStation">Police Station {form.policeStation.required && <span className="text-danger">*</span>}</label>
                  <PoliceStationSelect
                    type="policeStation"
                    className={`form-select ${form.policeStation.error && "is-invalid"}`}
                    id="policeStation"
                    name="policeStation"
                    value={form.policeStation.value}
                    onChange={(e) => handleChange({ name: "policeStation", value: e.currentTarget.value })}
                    districtCode={form.district.value}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.policeStation.error}
                  </div>
                </div>

                <hr className="my-4" />
                <div className="col-md-12 d-flex justify-content-md-end">
                  <button className="btn btn-primary btn-xl" type="submit" disabled={isPending}>
                    {isPending && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EstablishmentAdd;
