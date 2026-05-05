import React, {  useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";

const ProductDetails = () => {
  const product = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();

  // States for quantity and payment
  const [selectedPayment, setSelectedPayment] = useState(
    product.paymentOptions?.[0] || "Cash on Delivery",
  );
  const [quantity, setQuantity] = useState(product.minimumOrder || 1);

  const handleBooking = async () => {
    // 🔹 Check if user is logged in
    if (!user) {
      toast.error("Please login to place an order.");
      navigate("/auth/login");
      return;
    }

    // 🔹 Check role
    if (user.role !== "buyer") {
      toast.error("Only buyers can place orders.");
      return;
    }

    // 🔹 Quantity validation
    if (quantity < product.minimumOrder) {
      toast.error(`Minimum order quantity is ${product.minimumOrder}`);
      return;
    }

    if (quantity > product.availableQuantity) {
      toast.error(`Maximum available quantity is ${product.availableQuantity}`);
      return;
    }

    const bookingData = {
      productId: product._id,
      buyerEmail: user.email,
      productName: product.productName,
      price: product.price * quantity,
      quantity,
      paymentMethod: selectedPayment,
      status:
        selectedPayment === "Cash on Delivery" ? "Pending" : "Payment Pending",
    };

    try {
      if (selectedPayment === "Cash on Delivery") {
        // POST booking to backend
        const res = await fetch("http://localhost:3000/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });
        const data = await res.json();
        if (res.ok) {
          toast.success(
            "Booking Successful! Check your Dashboard → My Orders.",
          );
          navigate("/dashboard/my-orders");
        } else {
          toast.error(data.message || "Booking failed.");
        }
      } else {
        // Redirect to payment page
        navigate(
          `/payment/${product._id}?method=${selectedPayment}&quantity=${quantity}`,
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again later.");
    }
  };

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white my-10">
      {/* HERO */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[75vh] flex items-center justify-center overflow-hidden">
        <img
          src={product.productImage}
          alt={product.productName}
          className="absolute inset-0 w-full h-full object-cover opacity-30 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="relative z-10 text-center px-4 sm:px-6">
          <span className="px-4 py-1 rounded-full bg-indigo-600 text-xs sm:text-sm tracking-wide">
            Premium Collection
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold font-serif leading-tight">
            {product.productName}
          </h1>
          <div className="mt-2 text-3xl sm:text-4xl font-bold text-indigo-400">
            $ {product.price}
          </div>
          <p className="mt-2 max-w-2xl mx-auto text-gray-300 mb-12 text-sm sm:text-base md:text-lg">
            Designed for comfort, durability, and modern lifestyle
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative -mt-24 md:-mt-32 max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* IMAGE */}
          <div className="relative group rounded-xl md:rounded-2xl overflow-hidden">
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-[280px] sm:h-[350px] md:h-[420px] lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* INFO */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Product Overview
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                {product.description}
              </p>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-center">
                  <p className="text-xs sm:text-sm opacity-80">Category</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {product.category}
                  </p>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-center">
                  <p className="text-xs sm:text-sm opacity-80">Stock</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {product.availableQuantity}
                  </p>
                </div>
              </div>

              {/* BADGES */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs sm:text-sm">
                  Min Order: {product.minimumOrder}
                </span>
                {product.features?.map((f, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white/10 text-xs sm:text-sm"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* PAYMENT METHOD */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-semibold">
                  Select Payment Method:
                </label>
                <select
                  value={selectedPayment}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-full p-2 rounded-lg bg-white text-black"
                >
                  {product.paymentOptions?.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* QUANTITY */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-semibold text-white">
                  Quantity:
                </label>
                <input
                  type="number"
                  min={product.minimumOrder}
                  max={product.availableQuantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full p-2 rounded-lg bg-gray-800 text-white border-2 border-indigo-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* CTA BUTTON */}
            <button
              onClick={handleBooking}
              className="mt-8 md:mt-10 w-full py-4 md:py-5 rounded-xl text-base md:text-lg font-bold transition-all duration-500
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)]"
            >
              {user ? "Book / Order Now" : "Login to Continue"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
