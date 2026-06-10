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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 sm:h-52 md:h-64">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

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

      {/* 🛠️ Products Grid - Updated to strict 4 columns for mobile, tablet, and desktop */}
      <div className="max-w-7xl mx-auto px-1.5 sm:px-4 md:px-6 py-8 grid grid-cols-4 gap-1.5 sm:gap-4 md:gap-5 w-full">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>

      {/* Button */}
      <div className="text-center ">
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
