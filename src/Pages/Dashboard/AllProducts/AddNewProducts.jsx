import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

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
  const axiosSecure = useAxiosSecure();

  const paymentMethods = [
    "Cash on Delivery",
    "Bank Transper",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  data formatting
    const finalData = {
      ...formData,
      features: formData.features.split(",").map((f) => f.trim()),
      price: parseFloat(formData.price),
      availableQuantity: parseInt(formData.availableQuantity),
      minimumOrder: parseInt(formData.minimumOrder),
    };

    try {
      const res = await axiosSecure.post("/all-products", finalData);
      if (res.data.insertedId) {
        Swal.fire("success!", "Product added successfully", "success");
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
    <div className="min-h-screen bg-white text-ray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-gray-50 rounded-3xl p-8 shadow-xl border-gray-200">
        <h2 className="text-3xl  text-[#384bb4] font-bold mb-9 text-center ">
          Add New Product
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
              label: "Price ",
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
            { label: "Minimum Order", name: "minimumOrder", type: "number" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              {" "}
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                step={field.step}
                placeholder={field.placeholder}
                value={formData[field.name]} 
                onChange={handleChange}
                className="p-3 rounded-xl bg-white text-gray-80 border border-gray-300 outline-none "
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
              placeholder="Water-resistant, Lightweight, Outdoon-friendly"
              className="p-3 bg-white rounded-xl text-gray-800 border border-gray-300 outline-none "
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
              onChange={handleChange}
              className="p-3 rounded-xl bg-white text-gray-800 border border-gray-400 outline-none "
            ></textarea>
          </div>
          {/* payment options */}
          <div className="md:col-span-2">
            <label className=" text-sm font-semibold mb-4 text-indigo-600 block">
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
                      ? "bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                      : "bg-white border-gray-700 opacity-60"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="md:col-span-2 mt-8 py-4 rounded-xl bg-gradient-to-r from-sky-800 via-blue-400 text-white to-sky-800"
          >
            Create Product Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewProducts;
