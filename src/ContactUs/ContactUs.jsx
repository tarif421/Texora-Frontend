import React, { useState } from "react";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 future এ backend এ পাঠাতে পারো
    console.log(formData);

    Swal.fire({
      icon: "success",
      title: "Message Sent ✅",
      text: "We will contact you soon!",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen my-10 bg-base-200">
      {/* ✅ Hero */}
      <div className="bg-gradient-to-r from-indigo-800 to-sky-800 text-white py-20 text-center">
        <h2 className="text-5xl font-bold mb-3">Contact Us</h2>
        <p className="max-w-xl mx-auto">
          Have questions about bulk orders or production? Reach out to us
          anytime.
        </p>
      </div>

      {/* ✅ Main Content */}
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
        {/* ✅ Contact Info */}
        <div className="space-y-6">
          <div className="bg-base-100 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-2">📍 Address</h3>
            <p>Boshurhat, Companyganj, Bangladesh</p>
          </div>

          <div className="bg-base-100 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-2">📞 Phone</h3>
            <p>+880 1852 213220</p>
          </div>

          <div className="bg-base-100 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-2">✉️ Email</h3>
            <p>support@texora.com</p>
          </div>

          <div className="bg-base-100 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-bold mb-2">🕒 Working Hours</h3>
            <p>Saturday - Thursday: 9AM - 7PM</p>
          </div>
        </div>

        {/* ✅ Contact Form */}
        <div className="bg-base-100 p-8 rounded-2xl shadow">
          <h3 className="text-2xl font-bold mb-5">Send Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="input input-bordered w-full"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="input input-bordered w-full"
            />

            {/* Message */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="textarea textarea-bordered w-full h-28"
            ></textarea>

            {/* Button */}
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Map (Optional) */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-base-100 rounded-2xl p-6 shadow">
          <h3 className="text-xl font-bold mb-4">Find Us</h3>

          <div className="h-72 bg-gray-200 rounded-xl flex items-center justify-center">
            <p className="text-gray-500">Google Map Integration Here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
