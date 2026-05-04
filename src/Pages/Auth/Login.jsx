import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    // console.log("after register", data);
    signInUser(data.email, data.password)
    .then(result => {
      console.log(result.user)
    })
    .catch(error => {
      console.log(error)
    })
  };
  return (
    <div className=" flex items-center justify-center bg-base-200 p-4  min-h-screen">
     
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="card bg-base-100  w-full max-w-sm shadow-2xl p-8"
      >
         <h3 className="text-3xl text-center font-bold text-[#384bb4] font-serif">Please Login!</h3>
        <fieldset className="fieldset">
            
          {/* email field */}
          <label className="label">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}
          {/* password */}
          <label className="label">Password</label>
          <input
            {...register("password", { required: true, minLength: 6 })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 character of longer
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4 bg-linear-to-r from-sky-800 via-blue-400 text-white to-sky-800 border-none">Login</button>
        </fieldset>
        <p>New to Texora? <Link className="text-blue-600 underline" to='/register'>Register</Link></p>
          <SocialLogin></SocialLogin>
      </form>
    </div>
  );
};

export default Login;
