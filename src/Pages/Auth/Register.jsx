import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ImagePlus,
  UserPlus,
  ShieldCheck,
} from "lucide-react";

import axios from "axios";
import Swal from "sweetalert2";

import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { registerUser, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleRegistration = async (data) => {
    try {
      setRegisterError("");

      const profileImg = data.photo[0];

      // Register user
      const result = await registerUser(
        data.email,
        data.password
      );

      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", profileImg);

      const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imageRes = await axios.post(
        imageAPI_URL,
        formData
      );

      const photoURL = imageRes.data.data.url;

      // Update Firebase Profile
      const userProfile = {
        displayName: data.name,
        photoURL,
      };

      await updateUserProfile(userProfile);

      // Save user in database
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL,
      };

      await axiosSecure.post("/users", userInfo);

      Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: `Welcome ${result.user?.email}`,
        timer: 1800,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      console.log(error);

      if (error.code === "auth/email-already-in-use") {
        setRegisterError(
          "This email is already registered"
        );
      } else {
        setRegisterError(
          "Something went wrong. Please try again."
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-10">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-white/20 backdrop-blur-xl">
          
          {/* Top Gradient */}
          <div className="h-2 bg-gradient-to-r from-sky-700 via-blue-500 to-indigo-600"></div>

          {/* Glow Effect */}
          <div className="absolute -top-20 -right-16 w-48 h-48 bg-sky-200 opacity-30 blur-3xl rounded-full"></div>

          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="relative z-10 px-6 py-8 sm:px-10"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-blue-100 shadow-inner">
                <UserPlus
                  size={34}
                  className="text-sky-700"
                />
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Create Account
              </h1>

              <p className="mt-3 text-sm sm:text-base text-gray-500">
                Join Texora and start your journey 
              </p>
            </div>

            {/* Name */}
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <div className="relative group">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition"
                />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm sm:text-base outline-none transition-all duration-300 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>

              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Photo */}
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Profile Photo
              </label>

              <div className="relative group">
                <ImagePlus
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="file"
                  accept="image/*"
                  {...register("photo", {
                    required: "Profile photo is required",
                  })}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm cursor-pointer file:border-0 file:bg-sky-100 file:text-sky-700 file:px-3 file:py-1 file:rounded-lg file:mr-3 hover:file:bg-sky-200"
                />
              </div>

              {errors.photo && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.photo.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative group">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm sm:text-base outline-none transition-all duration-300 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative group">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sky-600 transition"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create strong password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Password must be at least 6 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                      message:
                        "Must contain uppercase, lowercase, number & special character",
                    },
                  })}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-14 text-sm sm:text-base outline-none transition-all duration-300 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />

                {/* Eye Toggle */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-sky-700 transition"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Security Text */}
            <div className="flex items-center gap-2 mb-5 text-xs text-gray-500">
              <ShieldCheck
                size={15}
                className="text-green-500"
              />
              Your information is securely protected
            </div>

            {/* Error */}
            {registerError && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                {registerError}
              </div>
            )}

            {/* Register Button */}
              <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 sm:h-13 rounded-xl bg-gradient-to-r from-sky-700 via-blue-500 to-indigo-600 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-70"
            >
              {isSubmitting ? "Register..." : "Register"}
            </button>

            {/* Divider */}
            <div className="my-7 flex items-center gap-3">
              <div className="flex-1 h-[1px] bg-gray-200"></div>

              <span className="text-xs font-semibold tracking-wider text-gray-400">
                OR CONTINUE WITH
              </span>

              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            {/* Social Login */}
            <div className="mb-6">
              <SocialLogin />
            </div>

            {/* Login Redirect */}
            <p className="text-center text-sm sm:text-base text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-sky-700 hover:text-sky-900 hover:underline transition"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};



export default Register;
