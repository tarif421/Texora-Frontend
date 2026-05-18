import { useState } from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const AddProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

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
   
    "Online Payment",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Only one payment method can be selected
  const handlePaymentChange = (e) => {
    const selectedMethod = e.target.value;

    setFormData({
      ...formData,
      paymentOptions: selectedMethod ? [selectedMethod] : [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      managerEmail: user?.email,
      features: formData.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f),
      price: parseFloat(formData.price),
      availableQuantity: parseInt(formData.availableQuantity),
      minimumOrder: parseInt(formData.minimumOrder),
    };

    try {
      const res = await axiosSecure.post("/all-products", finalData);

      if (res.data.insertedId) {
        Swal.fire("Success!", "Product added successfully", "success");

        setFormData({
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

        e.target.reset();
      }
    } catch (error) {
      console.log("post error", error);
      Swal.fire("Error", "Failed to add product", "error");
    }
  };
  //  if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-gray-50 rounded-3xl p-8 shadow-xl border-gray-200">
        <h2 className="text-3xl text-[#384bb4] font-bold mb-9 text-center">
          Add Product
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              label: "Product Name",
              name: "productName",
              type: "text",
              placeholder: "e.g. Windbreaker Jacket",
            },
            {
              label: "Product Image URL",
              name: "productImage",
              type: "text",
              placeholder: "https://image-link.com",
            },
            {
              label: "Price",
              name: "price",
              type: "number",
              step: "0.01",
            },
            {
              label: "Category",
              name: "category",
              type: "text",
              placeholder: "e.g. Outerwear",
            },
            {
              label: "Available Quantity",
              name: "availableQuantity",
              type: "number",
            },
            {
              label: "Minimum Order",
              name: "minimumOrder",
              type: "number",
            },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-sm font-semibold mb-2 text-gray-700">
                {field.label}
              </label>

              <input
                type={field.type}
                name={field.name}
                step={field.step}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className="p-3 rounded-xl bg-white text-gray-800 border border-gray-300 outline-none"
                required
              />
            </div>
          ))}

          {/* features */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Features
            </label>

            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Water-resistant, Lightweight, Outdoor-friendly"
              className="p-3 bg-white rounded-xl text-gray-800 border border-gray-300 outline-none"
            />
          </div>

          {/* description */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-semibold mb-2 text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="p-3 rounded-xl bg-white text-gray-800 border border-gray-400 outline-none"
              required
            ></textarea>
          </div>

          {/* payment option dropdown */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-semibold mb-2 text-indigo-600">
              Payment Method
            </label>

            <select
              name="paymentOptions"
              value={formData.paymentOptions[0] || ""}
              onChange={handlePaymentChange}
              required
              className="p-3 rounded-xl bg-white text-gray-800 border border-gray-300 outline-none"
            >
              <option value=""></option>

              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="md:col-span-2 mt-8 py-4 rounded-xl bg-linear-to-r from-sky-800 via-blue-400 text-white to-sky-800"
          >
            Create Product Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
