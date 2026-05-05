import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";

const ProductDetails = () => {
  const product = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const canOrder =
    user && user.role !== "admin" && user.role !== "manager";

    

  const handleOrderClick = () => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/auth/login");
      return;
    }

    if (!canOrder) {
      toast.error("Admins and Managers cannot place orders");
      return;
    }

    navigate(`/booking/${product._id}`);
  };

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white my-10">
      {/* HERO */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <img
          src={product.productImage}
          alt={product.productName}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative text-center">
          <h1 className="text-5xl font-bold">{product.productName}</h1>
          <p className="text-2xl text-indigo-400 mt-2">$ {product.price}</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
        <img
          src={product.productImage}
          alt={product.productName}
          className="rounded-xl"
        />

        <div>
          <p className="mb-4 text-gray-300">{product.description}</p>

          <ul className="space-y-2 mb-4">
            <li>Category: {product.category}</li>
            <li>Available Quantity: {product.availableQuantity}</li>
            <li>Minimum Order: {product?.minimumOrder}</li>
          </ul>

          <div className="flex flex-wrap gap-2 mb-6">
            {product.features?.map((f, i) => (
              <span key={i} className="px-3 py-1 bg-white/10 rounded-full">
                {f}
              </span>
            ))}
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-2">Payment Options:</p>
            {product.paymentOptions?.map((p, i) => (
              <span key={i} className="mr-3 px-3 py-1 bg-indigo-600 rounded-full">
                {p}
              </span>
            ))}
          </div>

      
          <button
            disabled={!canOrder}
            onClick={handleOrderClick}
            className={`w-full py-4 rounded-xl font-bold ${
              canOrder
                ? "bg-gradient-to-r from-indigo-500 to-pink-500"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Order / Book Now
          </button>
      
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;