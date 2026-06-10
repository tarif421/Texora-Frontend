import React from "react";
import { useQuery } from "@tanstack/react-query";

import AllProdCard from "./AllProdCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Allproduct = () => {
  const axiosSecure = useAxiosSecure();

  //  GET ALL PRODUCTS
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

  //  Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  //  Error state
  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load products
      </div>
    );
  }

  return (
    <>
      {/*  HEADER */}
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

      {/*  PRODUCT GRID */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-4 md:gap-5 w-full">
        {products.map((product) => (
          <AllProdCard key={product._id} product={product} />
        ))}
      </div>

      {/*  EMPTY STATE */}
      {products.length === 0 && (
        <div className="text-center text-gray-400 pb-10">
          No products available
        </div>
      )}
    </>
  );
};

export default Allproduct;
