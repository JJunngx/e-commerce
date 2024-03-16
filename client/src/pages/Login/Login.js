import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logActions } from "../../store/Log";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import useHttp from "../../hook/useHttp";
import { saveToStorage, getFromStorage } from "../../hook/Storage";
import classes from "./Login.module.css";

const Login = () => {
  const [success, setSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { resResults, error } = useHttp();
  const isLogged = getFromStorage("isLogged");

  useEffect(() => {
    if (Object.keys(isLogged).length > 0) {
      navigate("/");
    } else if (success) {
      saveToStorage("isLogged", success);
      dispatch(logActions.login(success));
      navigate("/");
    }
  }, [isLogged, success, navigate, dispatch]);

  const onSubmit = async (data) => {
    await resResults("post", data, "/login", setSuccess);
  };

  return (
    <div className={`d-flex justify-content-center ${classes.imgbg}`}>
      <div className={`${classes.signup} my-5 `}>
        <h2 className="text-center py-5">Log in</h2>

        <form
          className={`d-flex flex-column align-items-center ${classes.form}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@gmail\.com$/,
                message: "Email must be a valid Gmail address",
              },
            })}
            className={error && error?.email ? "border border-danger" : ""}
          />
          {error && error?.email && (
            <p className="text-danger">{error.email}</p>
          )}
          {errors.email && errors.email.type === "required" && (
            <p className="text-danger">please fill data</p>
          )}

          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
            className={error && error?.password ? "border border-danger" : ""}
          />
          {error && error?.password && (
            <p className="text-danger">{error.password}</p>
          )}
          {errors.password && errors.password.type === "required" && (
            <p className="text-danger">Please fill data</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="text-danger">
              Password must be at least 6 characters
            </p>
          )}

          <button className={`mt-4 ${classes.button}`}>Log in</button>
          <p className="mt-5">
            Create an account?
            <Link to="/register" className="text-decoration-none ">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
