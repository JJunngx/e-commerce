import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useHttp from "../../hook/useHttp";
import classes from "./Register.module.css";

const Login = () => {
  const [success, setSuccess] = useState();
  const [showError, setShowError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { resResults, error } = useHttp();
  useEffect(() => {
    setShowError(error);
  }, [error]);
  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  const onSubmit = async (data) => {
    await resResults("post", data, "/signup", setSuccess);
  };

  return (
    <div className={`d-flex justify-content-center ${classes.imgbg}`}>
      <div className={`${classes.signup} my-5 `}>
        <h2 className="text-center py-5">Sign Up</h2>
        <form
          className={`d-flex flex-column align-items-center ${classes.form}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullname", {
              required: true,
            })}
          />
          {errors.fullname && errors.fullname.type === "required" && (
            <p className="text-danger">please fill data</p>
          )}
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
            onChange={() => {
              if (showError) {
                setShowError(false);
              }
            }}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="text-danger">please fill data</p>
          )}
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
          {showError && <p className="text-danger">{showError.message}</p>}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="text-danger">Please fill data</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="text-danger">
              Password must be at least 6 characters
            </p>
          )}

          <input
            type="text"
            placeholder="Phone"
            name="phone"
            {...register("phone", { required: true, pattern: /^[0-9\b]+$/ })}
          />
          {errors.phone && errors.phone.type === "required" && (
            <p className="text-danger">Please fill data</p>
          )}
          {errors.phone && errors.phone.type === "pattern" && (
            <p className="text-danger">Invalid phone number</p>
          )}
          <button className={`mt-4 ${classes.button}`}>Sign up</button>
          <p className="mt-5">
            Login?
            <Link to="/login" className="text-decoration-none ">
              Click
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
