import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
} from "lucide-react";
import Swal from "sweetalert2";

import useAuth from "../../Hooks/useAuth";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { signInUser } = useAuth();

  const handleLogin = async (data) => {
    try {
      setLoginError("");

      const result = await signInUser(
        data.email,
        data.password
      );

      Swal.fire({
        title: "Login Successful!",
        text: `Welcome back ${
          result.user?.displayName || "User"
        } 👋`,
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });

      navigate(location.state || "/");
    } catch (error) {
      console.log(error);

      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        setLoginError("Incorrect email or password");
      } else if (error.code === "auth/user-not-found") {
        setLoginError("No account found with this email");
      } else {
        setLoginError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className=" backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden border border-white/20">
          {/* Top Design */}
          <div className="bg-gradient-to-r from-sky-700 via-blue-500 to-indigo-600 h-3"></div>

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="p-6 sm:p-8 lg:p-10"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-sky-100 mb-4">
                <LogIn className="text-sky-700" size={30} />
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#384bb4]">
                Welcome Back
              </h2>

              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Login to continue 
              </p>
            </div>

            {/* Email */}
            <div className="mb-5 text-gray-500">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 sm:h-13 pl-11 pr-4 border border-gray-300 rounded-xl bg-white outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-300 text-sm sm:text-base"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-3 text-gray-500">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Password must be at least 6 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-12 sm:h-13 pl-11 pr-12 border border-gray-300 rounded-xl bg-white outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all duration-300 text-sm sm:text-base"
                />

                {/* Eye Icon */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-sky-600 transition"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mb-5">
              <Link
                to="/forgot-password"
                className="text-sm text-sky-700 hover:text-sky-900 hover:underline transition"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Error */}
            {loginError && (
              <div className="bg-red-100 border border-red-300 text-red-600 text-sm rounded-xl px-4 py-3 mb-5 text-center">
                {loginError}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 sm:h-13 rounded-xl bg-gradient-to-r from-sky-700 via-blue-500 to-indigo-600 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-70"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-[1px] bg-gray-200"></div>

              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                OR 
              </p>

              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            {/* Social Login */}
            <div className="mb-5">
              <SocialLogin />
            </div>

            {/* Register */}
            <p className="text-center text-sm sm:text-base text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-sky-700 font-semibold hover:text-sky-900 hover:underline transition"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;