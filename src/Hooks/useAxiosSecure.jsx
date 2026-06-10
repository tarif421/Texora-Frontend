import axios from "axios";
import { useEffect } from "react";
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
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
