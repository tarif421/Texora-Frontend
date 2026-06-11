import axios from "axios";
import { useEffect } from "react";
import useAuth from "../Hooks/useAuth";

const baseURL = import.meta.env.VITE_API_URL || "https://texora-server-six.vercel.app";

const axiosSecure = axios.create({
  baseURL: baseURL,
});

const useAxiosSecure = () => {
  const { user, loading } = useAuth(); // যদি useAuth-এ loading স্টেট থাকে, নিতে পারেন

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        // ১. পাবলিক রুটগুলোর একটি লিস্ট তৈরি করুন যেগুলোতে টোকেন লাগবে না
        const publicRoutes = [
          "/latestProducts", 
          "/all-products", 
          "/productsDetails"
        ];

        // ২. চেক করুন বর্তমান রিকোয়েস্টের URL কোনো পাবলিক রুটের সাথে মিলে কি না বা তা দিয়ে শুরু হয় কি না
        const isPublicRoute = publicRoutes.some(route => config.url.startsWith(route));

        // ৩. যদি পাবলিক রুট হয়, তবে সরাসরি রিকোয়েস্ট পাস করে দাও (টোকেনের জন্য অপেক্ষা করবে না)
        if (isPublicRoute) {
          return config;
        }

        // ৪. প্রাইভেট বা সিকিউর রুটের ক্ষেত্রে আগের মতোই টোকেন অ্যাড হবে
        if (user) {
          try {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
          } catch (tokenError) {
            console.error("Error getting token:", tokenError);
          }
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