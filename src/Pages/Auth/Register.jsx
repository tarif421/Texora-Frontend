import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser } = useAuth();

  const handleRegistration = (data) => {
    console.log("fter register", data.photo[0]);
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // store the image and get the photo url
        // update user profile
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <form
        onSubmit={handleSubmit(handleRegistration)}
        className="card bg-base-100 w-full max-w-sm shadow-2xl p-8"
      >
        <h1 className="text-3xl text-center font-bold text-[#384bb4] font-serif">
          Welcome To Texora
        </h1>
        <p className="flex justify-center text-[#384bb4] font-bold">
          Please Register!
        </p>
        <fieldset className="fieldset">
          {/* Name field */}
          <label className="label">Name</label>
          <input
            {...register("email", { required: true })}
            type="text"
            className="input"
            placeholder="name"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}
          {/* Image field */}
          <label className="label">Photo</label>
          <input
            {...register("photo", { required: true })}
            type="file"
            className="file-input "
            placeholder="Your Photo"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Photo is required</p>
          )}
          {/* email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is Required</p>
          )}
          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 characters or longer
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must have one uppercase, one lowercase and a special
              character
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4 bg-linear-to-r from-sky-800 via-blue-400 text-white to-sky-800 border-none">
            Register
          </button>
        </fieldset>
        <p>
          Already have an account?{" "}
          <Link className="text-blue-600 underline" to="/login">
            Login
          </Link>
        </p>
        <SocialLogin></SocialLogin>
      </form>
    </div>
  );
};

export default Register;
