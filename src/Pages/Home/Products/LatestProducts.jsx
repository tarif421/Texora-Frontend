import { useEffect, useState } from "react";
import { Link } from "react-router";

import Card from "./Card";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get("/latestProducts");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [axiosSecure]);

  return (
    <>
      {/* Title Section */}
      <div className="text-center mt-8 sm:mt-12 md:mt-15 px-4">
        <h1 className="font-bold text-xl sm:text-3xl md:text-4xl text-[#384bb4] font-serif">
          Latest Products
        </h1>

        <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-1.5 sm:mt-2 max-w-xl mx-auto leading-relaxed">
          Discover our high-quality garments ready for bulk production.{" "}
          <br className="hidden sm:block" />
          Customizable to your brand's needs.
        </p>
      </div>

      {/* 🛠️ Products Grid - Strict 4 columns with 2 rows Skeleton Loader */}
      <div className="max-w-7xl mx-auto px-1.5 sm:px-4 md:px-6 py-8 grid grid-cols-4 gap-1.5 sm:gap-4 md:gap-5 w-full">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
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
          : products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
      </div>

      {/* Button */}
      <div className="text-center mb-10">
        <Link to="/allProducts">
          <button className="font-semibold text-xs sm:text-sm md:text-base text-[#384bb4] btn btn-xs sm:btn-sm md:btn-md bg-transparent border-[#384bb4] hover:bg-[#384bb4] hover:text-white transition-colors duration-300 rounded-md md:rounded-lg px-4 sm:px-6">
            View All Products →
          </button>
        </Link>
      </div>
    </>
  );
};

export default LatestProducts;
