import React from "react";
import { useQuery } from "@tanstack/react-query";

import AllProdCard from "./AllProdCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Allproduct = () => {
  const axiosSecure = useAxiosSecure();

  // GET ALL PRODUCTS
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-products");
      return res.data;
    },
  });

  // Error state
  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load products
      </div>
    );
  }

  return (
    <>
      {/* HEADER */}
      <div className="text-center mb-6 mt-8 sm:mt-12 md:mt-15 px-4">
        {/* Title - Responsive font scaling */}
        <h1 className="font-bold text-xl sm:text-3xl md:text-4xl text-[#384bb4] font-serif">
          All Products
        </h1>

        <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-1.5 sm:mt-2 max-w-xl mx-auto leading-relaxed">
          Discover our high-quality garments ready for bulk production.{" "}
          <br className="hidden sm:block" />
          Customizable to your brand's needs.
        </p>
      </div>

      {/* PRODUCT GRID & SKELETON LOADING */}
     <div className="grid grid-cols-4 gap-1.5 sm:gap-4 md:gap-5 w-full">
  {isLoading
    ? 
      Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-md md:rounded-lg p-2 sm:p-4 w-full space-y-3 animate-pulse"
        >
          {/* Product Image Skeleton */}
          <div className="bg-gray-200 rounded-md w-full h-32 sm:h-48 md:h-56"></div>
          
          {/* Product Title Skeleton */}
          <div className="space-y-2">
            <div className="bg-gray-200 h-4 rounded w-3/4"></div>
            <div className="bg-gray-200 h-3 rounded w-1/2"></div>
          </div>

          {/* Price and Button Skeleton */}
          <div className="flex justify-between items-center pt-2">
            <div className="bg-gray-200 h-4 rounded w-1/4"></div>
            <div className="bg-gray-200 h-6 rounded w-1/3"></div>
          </div>
        </div>
      ))
    : 
      products.map((product) => (
        <AllProdCard key={product._id} product={product} />
      ))}
</div>

      {/* EMPTY STATE */}
      {!isLoading && products.length === 0 && (
        <div className="text-center text-gray-400 pb-10 mt-6">
          No products available
        </div>
      )}
    </>
  );
};

export default Allproduct;