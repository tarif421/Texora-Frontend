import React, { useState } from "react";

const AddNewProducts = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productImage: "",
    price: "",
    description: "",
    category: "",
    availableQuantity: "",
    minimumOrder: "",
    features: "", 
    paymentOptions: [],
  });

  const paymentMethods = [
    "Cash on Delivery",
    "Bank Transfer",
    "Stripe",
    "Online Payment",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentChange = (method) => {
    const updatedOptions = formData.paymentOptions.includes(method)
      ? formData.paymentOptions.filter((m) => m !== method)
      : [...formData.paymentOptions, method];
    setFormData({ ...formData, paymentOptions: updatedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      features: formData.features.split(",").map((f) => f.trim()),
      price: parseFloat(formData.price),
      availableQuantity: parseInt(formData.availableQuantity),
      minimumOrder: parseInt(formData.minimumOrder),
    };

    console.log("Submitting to Backend:", finalData);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-gray-50 rounded-3xl p-8 shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          Add New Product (Manager Portal)
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Input field wrapper class: bg-white text-gray-800 border-gray-300 */}
          {[
            { label: "Product Name", name: "productName", type: "text", placeholder: "e.g. Windbreaker Jacket" },
            { label: "Product Image URL", name: "productImage", type: "text", placeholder: "https://image-link.com" },
            { label: "Price ($)", name: "price", type: "number", step: "0.01" },
            { label: "Category", name: "category", type: "text", placeholder: "e.g. Outerwear" },
            { label: "Available Quantity", name: "availableQuantity", type: "number" },
            { label: "Minimum Order", name: "minimumOrder", type: "number" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-sm font-semibold mb-2 text-gray-700">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                step={field.step}
                placeholder={field.placeholder}
                className="p-3 rounded-xl bg-white text-gray-800 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                onChange={handleChange}
                required
              />
            </div>
          ))}

          {/* Features */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Features (Comma separated)
            </label>
            <input
              type="text"
              name="features"
              placeholder="Water-resistant, Lightweight, Outdoor-friendly"
              className="p-3 rounded-xl bg-white text-gray-800 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">Description</label>
            <textarea
              name="description"
              rows="4"
              className="p-3 rounded-xl bg-white text-gray-800 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Payment Options */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-4 text-indigo-600">
              Enable Payment Options:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {paymentMethods.map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() => handlePaymentChange(method)}
                  className={`p-3 rounded-xl text-xs font-bold transition-all duration-300 border ${
                    formData.paymentOptions.includes(method)
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg"
                      : "bg-white border-gray-300 text-gray-600 hover:border-indigo-400"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="md:col-span-2 mt-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg hover:opacity-90 hover:scale-[1.01] transition-all shadow-xl"
          >
            Create Product Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewProducts;