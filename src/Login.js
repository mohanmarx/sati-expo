import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom } from "./_state";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authAtom);

  const usertoken = localStorage.getItem("user");
  const valid = useRecoilValue(authAtom);
  useEffect(() => {
    if (usertoken) {
      setAuth(usertoken);
    }
    // eslint-disable-next-line
  }, [usertoken]);

  if (valid) {
    return <Navigate to="/register" replace />;
  }
  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify("token"));
    setAuth("token");
    navigate("/register", { replace: true });
    // localStorage.setItem('user', JSON.stringify(user));
    // setAuth(user);
  };

  return (
    <div className="row register">
      <div className="background-img">
        <img className="bg" src="/background.jpg" alt="" />
        <img className="logo" src="https://app.sati.live/logo.svg" alt="" />
      </div>

      <div className="col-lg-6"></div>
      <div className="col-lg-6 card-login card-register">
        <div className="container-card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <img
              className="logo d-flex mx-auto mb-2"
              src="https://app.sati.live/logo.svg"
              alt=""
            />

            <p className="tradeshow sub-title text-center mb-4">Login</p>

            <div className="form-input">
              <label className="form-label">Email address</label>
              <input
                type="text"
                className="form-control"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-warning">This field is required</span>
              )}
            </div>

            <div className="form-input">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                {...register("password", { required: true })}
              />
              {errors.email && (
                <span className="text-warning">This field is required</span>
              )}
            </div>

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
