import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Card from "./Card";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get("/latestProducts");
        setProducts(res.data);
        // console.log(res.data)
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="font-bold text-4xl text-center text-[#384bb4] mt-15 font-serif">
          Latest Products
        </h1>
        <p className="text-xs text-center mt-2">
          Discover our high-quality garments ready for bulk production. <br />
          Customizable to your brand's needs.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-10 gap-5 ">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
      <div>
        <Link to="/allProducts">
          <button className="font-semibold  text-xl text-[#384bb4] btn">
            View All Products →
          </button>
        </Link>
      </div>
    </>
  );
};

export default LatestProducts;
