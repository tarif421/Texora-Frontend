import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

const BookingPage = () => {
  const product = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(product.minimumOrder);
  const [paymentMethod, setPaymentMethod] = useState(
    product.paymentOptions[0]
  );

  const totalPrice = quantity * product.price;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantity < product.minimumOrder) {
      return toast.error(`Minimum order is ${product.minimumOrder}`);
    }

    if (quantity > product.availableQuantity) {
      return toast.error("Quantity exceeds stock");
    }

    const bookingData = {
      productId: product._id,
      buyerEmail: user.email,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      quantity,
      totalPrice,
      contact: e.target.contact.value,
      address: e.target.address.value,
      notes: e.target.notes.value,
      paymentMethod,
      status:
        paymentMethod === "Cash on Delivery"
          ? "Pending"
          : "Payment Pending",
    };

    if (paymentMethod !== "Cash on Delivery") {
      navigate(
        `/payment/${product._id}?quantity=${quantity}&method=${paymentMethod}`
      );
      return;
    }

    const res = await fetch("http://localhost:3000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    if (res.ok) {
      toast.success("Order placed successfully");
      navigate("/dashboard/my-orders");
    } else {
      toast.error("Booking failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Booking Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={user.email} readOnly className="input" />
        <input value={product.productName} readOnly className="input" />
        <input value={`$${product.price}`} readOnly className="input" />

        <input name="firstName" placeholder="First Name" required />
        <input name="lastName" placeholder="Last Name" required />

        <input
          type="number"
          min={product.minimumOrder}
          max={product.availableQuantity}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <input value={`Total: $${totalPrice}`} readOnly />

        <input name="contact" placeholder="Contact Number" required />
        <textarea name="address" placeholder="Delivery Address" required />
        <textarea name="notes" placeholder="Additional Notes" />

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          {product.paymentOptions.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <button className="w-full py-3 bg-indigo-600 rounded-lg">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
``