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
      <div className="mt-10 sm:mt-12 md:mt-15 px-4">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center text-[#384bb4] font-serif">
          Latest Products
        </h1>
        <p className="text-xs sm:text-sm text-center mt-2 max-w-xl mx-auto">
          Discover our high-quality garments ready for bulk production.
          <br className="hidden sm:block" />
          Customizable to your brand's needs.
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>

      {/* Button */}
      <div className="text-center mb-10">
        <Link to="/allProducts">
          <button className="font-semibold text-base sm:text-lg md:text-xl text-[#384bb4] btn">
            View All Products →
          </button>
        </Link>
      </div>
    </>
  );
};

export default LatestProducts;
