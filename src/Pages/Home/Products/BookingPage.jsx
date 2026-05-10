import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";

const BookingPage = () => {
  const product = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(product?.minimumOrder || 1);

  // ✅ Auto price
  const totalPrice = quantity * product.price;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    // if (quantity < product.minimumOrder) {
    //   toast.error(`Minimum ${product.minimumOrder}`);
    //   return;
    // }
    if (value < product.minimumOrder) {
      toast.error(`Minimum ${product.minimumOrder}`);
      return;
    }

    if (value > product.availableQuantity) {
      toast.error(`Max ${product.availableQuantity}`);
      return;
    }

    setQuantity(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Login required");
      return navigate("/auth/login");
    }

    const form = e.target;

    const orderData = {
      email: user.email,
      productId: product._id,
      productTitle: product.productName,
      price: product.price,
      quantity,
      totalPrice,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      contact: form.contact.value,
      address: form.address.value,
      notes: form.notes.value,
      paymentStatus: "unpaid",
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/orders", orderData);

      if (res.data.insertedId) {
        const requiresPayment = product.paymentOptions?.some((p) =>
          ["Stripe", "cash on Delivery"].includes(p.toLowerCase()),
        );

        if (requiresPayment) {
          toast.success("Proceed to Payment");
          navigate(`/payment/${res.data.insertedId}`);
        } else {
          toast.success("Order Confirmed (Cash on Delivery)");
          navigate("/dashboard/my-orders");
        }
      }
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen my-8 min-h-screen text-white flex items-center justify-center p-4">
      <div className="card w-full max-w-2xl bg-base-100 p-4 text-black shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <FaShoppingCart /> Booking Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <label >Email:</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full"
            />

            {/* Product */}
             <label >Category:</label>
            <input
              type="text"
              value={product.productName}
              readOnly
              className="input input-bordered w-full"
            />

            {/* Price */}
             <label >Price:</label>
            <input
              type="text"
              value={`$${product.price}`}
              readOnly
              className="input input-bordered w-full"
            />

            {/* Name */}
            <div className="grid grid-cols-2 gap-3">
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                required
                className="input input-bordered w-full"
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Quantity */}
            <div>
                 <label > Order Peace:</label>
              <input
                type="number"
                placeholder={quantity}
                onChange={handleQuantityChange}
                min={product.minimumOrder}
                max={product.availableQuantity}
                className="input input-bordered w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Min: {product.minimumOrder} | Max: {product.availableQuantity}
              </p>
            </div>

            {/* Total Price */}
            <label >Total Price:</label>
            <input
              type="text"
              value={`$${totalPrice}`}
              readOnly
              className="input input-bordered w-full font-bold text-green-600"
            />

            {/* Contact */}
            <label >Phone:</label>
            <input
              name="contact"
              type="text"
              placeholder="Contact Number"
              required
              className="input input-bordered w-full"
            />

            {/* Address */}
            <label>Address:</label>
            <textarea
              name="address"
              placeholder="Delivery Address"
              required
              className="textarea textarea-bordered w-full"
            />

            {/* Notes */}
            <label >Your Opinion:</label>
            <textarea
              name="notes"
              placeholder="opinion"
              className="textarea textarea-bordered w-full"
            />

            {/* Submit */}
            <button className="btn btn-primary w-full">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
