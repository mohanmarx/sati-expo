import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Countries } from "./Countries";

import CustomSelect from "./CustomSelect";
import useGeoLocation from "./useGeoLocation";
import { useEffect } from "react";

function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { getLocation, location } = useGeoLocation();


  const onSubmit = (data) => console.log(data);

  const countries_data = Countries.map((el) => ({
    value: { name: el.name.common, country_code: el.cca3 },
    label: el.name.common,
  }));

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if(!location.error && Object.keys(location.data).length > 0){
      console.log(location.data);
    }
  }, [location]);

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="row register">
      <div className="background-img">
        <img className="bg" src="/background.jpg" alt="" />
        <img className="logo" src="https://app.sati.live/logo.svg" alt="" />
      </div>

      <div className="col-lg-6"></div>
      <div className="col-lg-6 card-register">
        <div className="container-card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-out" onClick={handleLogout}>
              logout
            </p>
            <img
              className="logo d-flex mx-auto mb-2"
              src="https://app.sati.live/logo.svg"
              alt=""
            />

            <p className="tradeshow sub-title text-center mb-4">
              Client Registarion Form
            </p>
            <div className="row">
              <div className="col-lg-6 ">
                <div className="form-input">
                  <label className="form-label">Fullname</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-warning">This field is required</span>
                  )}
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="form-input">
                  <label className="form-label">Primary Market</label>
                  <Controller
                    control={control}
                    name="country"
                    required
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <CustomSelect
                        className="form-control custom-select"
                        options={countries_data}
                        onSelectChange={(el) => onChange(el.value)}
                      />
                    )}
                  />
                  {errors.countries_data && (
                    <span className="text-warning font-weight-normal">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 ">
                <div className="form-input">
                  <label className="form-label">Email address</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-warning">This field is required</span>
                  )}
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="form-input">
                  <label className="form-label">Contact Number</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("contact_number", { required: true })}
                  />
                  {errors.contact_number && (
                    <span className="text-warning">This field is required</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-input">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                {...register("company_name", { required: true })}
              />
              {errors.company_name && (
                <span className="text-warning">This field is required</span>
              )}
            </div>

            <div className="form-input">
              <label className="form-label">Designation</label>
              <input
                type="text"
                className="form-control"
                {...register("designation", { required: true })}
              />
              {errors.designation && (
                <span className="text-warning">This field is required</span>
              )}
            </div>

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
