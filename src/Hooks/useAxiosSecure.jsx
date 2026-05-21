import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "../Hooks/useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
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