import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit , formState: { errors }} = useForm()

  const handleRegistration = (data) => {
console.log("after register", data)
  }
  return (
    <div className=" flex items-center justify-center bg-base-200 p-4  min-h-screen">
      <form onSubmit={handleSubmit(handleRegistration)} className="card bg-base-100  w-full max-w-sm shadow-2xl p-8">
        <fieldset className="fieldset">
          {/* email */}
          <label className="label">Email</label>
          <input {...register('email', {required: true})} type="email" className="input" placeholder="Email" />
          {/* password */}
          <label className="label">Password</label>
          <input {...register('password')} type="password" className="input" placeholder="Password" />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
