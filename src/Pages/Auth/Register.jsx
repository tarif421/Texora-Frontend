import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {} = useForm();
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <form className="card bg-base-100 w-full max-w-sm shadow-2xl p-8">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
