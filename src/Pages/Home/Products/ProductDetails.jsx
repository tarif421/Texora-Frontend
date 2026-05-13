import React from "react";
import { Link, useLoaderData, useNavigate, NavLink } from "react-router";

import Swal from "sweetalert2";
import useRole from "../../../Hooks/useRole";
import useAuth from "../../../Hooks/useAuth";

const ProductDetails = () => {
  const product = useLoaderData();
  const { user } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();

  const handleOrderClick = async () => {
    if (!user) {
      // Not logged in
      await Swal.fire({
        icon: "info",
        title: "Please login to continue",
      });

      navigate("/login");
      return;
    }

    // Admin / Manager blocked
    if (role === "admin" || role === "manager") {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "Admins and Managers cannot place orders",
      });
      return;
    }

    // Pending user
    if (role === "user") {
      Swal.fire({
        icon: "info",
        title: "Account Pending",
        text: "You are pending. Please wait for approval.",
      });
      return;
    }

    // Buyer allowed
    if (role === "buyer") {
      navigate(`/booking/${product._id}`);
    }
    // const isStripeOnly = product.paymentOptions?.includes("Stripe");
    // if (isStripeOnly) {
    //   navigate(`/checkout-page/${product._id}`);
    // } else {
    //   navigate(`/booking/${product._id}`);
    // }
  };

  if (!product) return null;

  return (
    <div className=" py-15 rounded-2xl shadow-2xl my-30 bg-[#121842] text-white my-10">
      {/* HERO */}
    

      {/* CONTENT */}
      <section className="max-w-7xl ml-4 place-items-center mx-auto p-6 grid md:grid-cols-2 gap-10">
        <img
          src={product.productImage}
          alt={product.productName}
          className="rounded-xl"
        />

        <div >
          <p className="mb-4 font-bols text-4xl text-[#2891ed]">{product.productName}</p>
          <p className="mb-4 text-gray-300">{product.description}</p>

          <ul className="space-y-2 mb-4">
            <li className="text-gray-300">Category: {product.category}</li>
            <li className="text-gray-300">Available Quantity: {product.availableQuantity}</li>
            <li className="text-gray-300">Minimum Order: {product?.minimumOrder}</li>
            <li className="text-[#2891ed] text-2xl">Price: {product.price}</li>
          </ul>

          <div className="flex flex-wrap gap-2 mb-6">
            {product.features?.map((f, i) => (
              <span key={i} className="px-3 py-1 bg-white/10 rounded-full">
                {f}
              </span>
            ))}
          </div>

          <div className="mb-6">
            <p className="text-gray-200 font-semibold mb-2">Payment Options:</p>
            {product.paymentOptions?.map((p, i) => (
              <span
                key={i}
                className="mr-3 px-3 py-1 bg-indigo-600 rounded-full"
              >
                {p}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={handleOrderClick}
            className={`w-full py-4 rounded-xl font-bold transition-all active:scale-95 ${
              role === "admin" || role === "manager"
                ? "bg-gray-500"
                : "md:col-span-2  py-4 rounded-xl bg-linear-to-r from-sky-800 via-blue-400 text-white to-sky-800"
            }`}
          >
            {product.paymentOptions?.[0] === "Stripe"
              ? "Proceed to pay"
              : "Booking Order"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
