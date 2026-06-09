import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "../Hooks/useAuth";

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://texora-server-six.vercel.app";

const axiosSecure = axios.create({
  baseURL: baseURL,
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure.interceptors.request.use(async (config) => {
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
