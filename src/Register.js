import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Countries } from "./Countries";

import CustomSelect from "./CustomSelect";
import useGeoLocation from "./useGeoLocation";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

export const BASE_URL = "https://api.sati.tech/api/v1";
// export const BASE_URL = "http://localhost:8080/api/v1";

const DEFAULT_VARIANT = "success";
const DEFAULT_TIMEOUT = 4000;
const TRANSITION_DURATION = { enter: 225, exit: 195 };

const options = {
  variant: DEFAULT_VARIANT,
  autoHideDuration:
    DEFAULT_TIMEOUT - TRANSITION_DURATION.enter - TRANSITION_DURATION.exit,
  disableWindowBlurListener: true,
  transitionDuration: TRANSITION_DURATION,
  preventDuplicate: true,
};
function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { getLocation, location } = useGeoLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setloading] = useState(false);

  const onSubmit = (data) => {
    var res = { ...data, captured_geolocation: location.data };
    setloading(true);
    axios
      .post(`${BASE_URL}/expo/register`, { ...res })
      .then((res) => {
        console.log(res);
        setloading(false);
        enqueueSnackbar("Registered Sucessfully!!", options);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        enqueueSnackbar("Something went wrong!! plaese try later", {
          ...options,
          variant: "error",
        });
      });
  };

  const countries_data = Countries.map((el) => ({
    value: { name: el.name.common, country_code: el.cca3 },
    label: el.name.common,
  }));

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <React.Fragment>
      {loading && <Loader />}
      <section className="min-vh-100 mb-2">
        <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg">
          <span className="mask bg-gradient-light opacity-1"></span>
          <div className="container">
            <div className="row justify-content-center ">
              <div className="col-lg-5 text-center mx-auto">
                <img className="logo" alt="" src="/logo.svg" />
                <h1 className=" mb-2 mt-5">Welcome!</h1>
                <h5 className="text-lead">Sati Expo</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-lg-n10 mt-md-n11 mt-n10">
            <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
              <div className="card z-index-0">
                <div className="card-header text-center pt-4">
                  <h5>To get a Quote</h5>
                </div>
                <div className="card-body pt-0">
                  <form role="form text-left" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        {...register("name", { required: true })}
                      />
                      {errors.name && (
                        <span className="text-danger text-xs">
                          This field is required
                        </span>
                      )}
                    </div>

                    <div className="mb-3">
                      <Controller
                        control={control}
                        name="country"
                        required
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <CustomSelect
                            className="form-control custom-select"
                            options={countries_data}
                            placeholder="country"
                            onSelectChange={(el) => onChange(el.value)}
                          />
                        )}
                      />
                      {errors.country && (
                        <span className="text-danger text-xs">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        {...register("email", { required: true })}
                      />
                      {errors.email && (
                        <span className="text-danger text-xs">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Phone numer"
                        {...register("contact_number", { required: true })}
                      />
                      {errors.contact_number && (
                        <span className="text-danger text-xs">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Company Name"
                        {...register("company_name", { required: true })}
                      />
                      {errors.company_name && (
                        <span className="text-danger text-xs">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Designation"
                        {...register("designation", { required: true })}
                      />
                      {errors.designation && (
                        <span className="text-danger text-xs">
                          This field is required
                        </span>
                      )}
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn bg-gradient-warning w-100 my-4 mb-2"
                      >
                        Get a Quote
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
}

export default Register;

const Footer = () => {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row">
          <div className="col-8 mx-auto text-center mt-1">
            <p className="mb-0 text-secondary">
              Copyright © {new Date().getFullYear()} Sati Exports India Pvt Ltd.
              All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Loader = () => {
  return (
    <div className="full-screen-loader">
      <div className="loader">
        <svg viewBox="0 0 80 80">
          <rect x="8" y="8" width="64" height="64"></rect>
        </svg>
      </div>
      <h5 className="mt-5">please wait registartion under process</h5>
    </div>
  );
};
