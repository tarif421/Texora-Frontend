import { useState } from "react";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AddNewProducts = () => {
  const axiosSecure = useAxiosSecure();

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
    showOnHome: false,
  });

  const paymentMethods = ["Cash on Delivery", "Stripe"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  return (
    <div className="min-h-screen bg-base-200 px-3 py-6 sm:px-5 sm:py-8 lg:px-8">
      
      {/* Container */}
      <div className="max-w-5xl mx-auto bg-base-100 rounded-3xl shadow-sm border border-base-300 p-4 sm:p-6 md:p-8 lg:p-10">

        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#384bb4]">
            Add Product
          </h2>

          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Create a clean and professional product listing
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
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
              
              <label className="text-sm sm:text-base font-medium mb-2 text-gray-700">
                {field.label}
              </label>

              <input
                type={field.type}
                name={field.name}
                step={field.step}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="
                  h-12 sm:h-13
                  px-4
                  rounded-2xl
                  border border-gray-300
                  bg-white
                  text-sm sm:text-base
                  text-gray-800
                  outline-none
                  focus:border-[#384bb4]
                  focus:ring-2
                  focus:ring-[#384bb4]/20
                  transition
                "
              />
            </div>
          ))}

          {/* Features */}
          <div className="md:col-span-2 flex flex-col">
            
            <label className="text-sm sm:text-base font-medium mb-2 text-gray-700">
              Features
            </label>

            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Water-resistant, Lightweight, Outdoor-friendly"
              className="
                h-12 sm:h-13
                px-4
                rounded-2xl
                border border-gray-300
                bg-white
                text-sm sm:text-base
                text-gray-800
                outline-none
                focus:border-[#384bb4]
                focus:ring-2
                focus:ring-[#384bb4]/20
                transition
              "
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col">
            
            <label className="text-sm sm:text-base font-medium mb-2 text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              required
              className="
                p-4
                rounded-2xl
                border border-gray-300
                bg-white
                text-sm sm:text-base
                text-gray-800
                outline-none
                resize-none
                focus:border-[#384bb4]
                focus:ring-2
                focus:ring-[#384bb4]/20
                transition
              "
            ></textarea>
          </div>

          {/* Payment */}
          <div className="md:col-span-2 flex flex-col">
            
            <label className="text-sm sm:text-base font-medium mb-2 text-gray-700">
              Payment Method
            </label>

            <select
              name="paymentOptions"
              value={formData.paymentOptions[0] || ""}
              onChange={handlePaymentChange}
              required
              className="
                h-12 sm:h-13
                px-4
                rounded-2xl
                border border-gray-300
                bg-white
                text-sm sm:text-base
                text-gray-800
                outline-none
                focus:border-[#384bb4]
                focus:ring-2
                focus:ring-[#384bb4]/20
                transition
              "
            >
              <option value="">Select Payment Method</option>

              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              md:col-span-2
              mt-4 sm:mt-6
              h-12 sm:h-14
              rounded-2xl
              text-sm sm:text-base
              font-semibold
              text-white
              bg-gradient-to-r
              from-sky-800
              via-blue-500
              to-sky-800
              hover:scale-[1.01]
              transition-all
              duration-300
              shadow-md
            "
          >
            Create Product Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewProducts;