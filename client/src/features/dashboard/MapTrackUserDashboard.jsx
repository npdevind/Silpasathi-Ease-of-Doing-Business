import React from "react";
import DepartmentSelect from "../../components/select/DepartmentSelect";
import { useValidate } from "../../hooks";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../utils";
import Chart from "react-apexcharts";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorAlert from "../../components/ErrorAlert";

const MapTrackUserDashboard = () => {
  const [form, validator] = useValidate({
    department: { value: "", validate: "required" },
  });
  const handleChange = (evt) => {
    validator.validOnChange(evt);
  };

  const {
    data: barChartData,
    isLoading: barChartLoading,
    error: barChartError,
  } = useQuery({
    queryKey: ["graph-information-of-actual-data"],
    queryFn: () => fetcher(`/graph-information-of-actual-data`),
  });

  const {
    data: pieChartData,
    isLoading: pieChartLoading,
    error: pieChartError,
  } = useQuery({
    queryKey: ["graph-information-of-percentage-data"],
    queryFn: () => fetcher(`/graph-information-of-percentage-data`),
  });

  return (
    <>
      <div className="mt-3 px-4">
        <div className="row">
          <div className="col-md-12">
            <div className="card border-0 shadow" style={{ width: "20%" }}>
              <div className="card-body bg-light">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-control-label" htmlFor="department">
                        Select Department {form.department.required && <span className="text-danger">*</span>}
                      </label>
                      <DepartmentSelect
                        className={`form-select ${form.department.error && "is-invalid"}`}
                        id="department"
                        name="department"
                        required={form.department.required}
                        value={form.department.value}
                        onChange={(e) => handleChange({ name: "department", value: e.currentTarget.value })}
                        option_all="true"
                      />
                      <div id="Feedback" className="invalid-feedback">
                        {form.department.error}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 rounded shadow">
              <div className="card-body bg-light rounded">
                {barChartLoading && <LoadingSpinner />}
                {barChartError && <ErrorAlert error={barChartError} />}
                {barChartData && <Chart options={barChartData?.options} series={barChartData?.series} type="bar" height={350} />}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 rounded shadow">
              <div className="card-body bg-light rounded">
                {pieChartLoading && <LoadingSpinner />}
                {pieChartError && <ErrorAlert error={pieChartError} />}
                {pieChartData && <Chart options={pieChartData?.options} series={pieChartData?.series} type="pie" height={363} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapTrackUserDashboard;
