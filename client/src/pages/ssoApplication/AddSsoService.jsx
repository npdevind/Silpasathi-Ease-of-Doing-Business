import { useValidate } from "../../hooks";
import DepartmentSelect from "../../components/select/DepartmentSelect";
import ServiceSelect from "../../components/select/ServiceSelect";

const AddSsoService = () => {
  const [form, validator] = useValidate({
    department: { value: "", validate: "required" },
    service: { value: "", validate: "required" },
    master_field: { value: "", validate: "required" },
    field_label: { value: "", validate: "required" },
  });

  const handleChange = (evt) => {
    validator.validOnChange(evt);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.validate()) return;
    const formData = validator.generalize();
    console.log(formData);
  };
  return (
    <>
      <div className="card mb-4 inner-area ">
        <div className="card-body d-flex flex-column ">
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <label htmlFor="department">Select Department {form.department.required && <span className="text-danger">*</span>}</label>
                  <DepartmentSelect
                    type="department"
                    className={`form-select ${form.department.error && "is-invalid"}`}
                    id="department"
                    name="department"
                    value={form.department.value}
                    onChange={(e) => handleChange({ name: "department", value: e.currentTarget.value })}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.department.error}
                  </div>
                </div>

                <div className="col-md-3 mb-2">
                  <label htmlFor="service">Select Service {form.service.required && <span className="text-danger">*</span>}</label>
                  <ServiceSelect
                    type="service"
                    className={`form-select ${form.service.error && "is-invalid"}`}
                    id="service"
                    name="service"
                    value={form.service.value}
                    onChange={(e) => handleChange({ name: "service", value: e.currentTarget.value })}
                    departmentCode={form.department.value}
                  />
                  <div id="Feedback" className="invalid-feedback">
                    {form.service.error}
                  </div>
                </div>
              </div>

              <div className="row">
                {form.service.value !== "" && (
                  <div className="col-md-3 mb-2">
                    <label htmlFor="master_field">Select Master Field {form.master_field.required && <span className="text-danger">*</span>}</label>
                    <input
                      type="master_field"
                      className={`form-select ${form.master_field.error && "is-invalid"}`}
                      id="master_field"
                      name="master_field"
                      value={form.master_field.value}
                      onChange={(e) => handleChange({ name: "master_field", value: e.currentTarget.value })}
                    />
                    <div id="Feedback" className="invalid-feedback">
                      {form.master_field.error}
                    </div>
                  </div>
                )}

                {form.service.value !== "" && (
                  <div className="col-md-3 mb-2">
                    <label htmlFor="field_label">Field Label {form.field_label.required && <span className="text-danger">*</span>}</label>
                    <input
                      type="text"
                      className={`form-control ${form.field_label.error && "is-invalid"}`}
                      id="field_label"
                      name="field_label"
                      value={form.field_label.value}
                      onChange={(e) => handleChange(e.currentTarget)}
                    />
                    <div id="Feedback" className="invalid-feedback">
                      {form.field_label.error}
                    </div>
                  </div>
                )}
              </div>
              <hr className="my-4" />
              <div className="col-md-12 d-flex justify-content-md-end">
                <button className="btn btn-primary btn-xl" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSsoService;
