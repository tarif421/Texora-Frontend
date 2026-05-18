import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  });

  const paymentMethods = ["Cash on Delivery", "Stripe"];

  /* Load existing data */
  useEffect(() => {
    const loadProduct = async () => {
      const res = await axiosSecure.get(`/products/${id}`);

      setFormData({
        ...res.data,
        features: res.data.features?.join(", "),
      });
    };

    loadProduct();
  }, [id, axiosSecure]);

  /*  Handle change */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*  Payment */
  const handlePaymentChange = (e) => {
    const selected = e.target.value;

    setFormData({
      ...formData,
      paymentOptions: selected ? [selected] : [],
    });
  };

  /*  Submit update */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      features: formData.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f),
      price: parseFloat(formData.price) || 0,
      availableQuantity: parseInt(formData.availableQuantity) || 0,
      minimumOrder: parseInt(formData.minimumOrder) || 0,
    };

    try {
      const res = await axiosSecure.patch(`/products/${id}`, finalData);

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Product updated ✅", "success");
        navigate("/dashboard/all-products");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Update failed ", "error");
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto bg-gray-50 rounded-3xl p-8 shadow">

        <h2 className="text-3xl font-bold text-center text-[#384bb4] mb-8">
          Update Product
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          {[
            { name: "productName", label: "Product Name", type: "text" },
            { name: "productImage", label: "Image URL", type: "text" },
            { name: "price", label: "Price", type: "number" },
            { name: "category", label: "Category", type: "text" },
            {
              name: "availableQuantity",
              label: "Available Quantity",
              type: "number",
            },
            {
              name: "minimumOrder",
              label: "Minimum Order",
              type: "number",
            },
          ].map((f) => (
            <div key={f.name} className="flex flex-col">
              <label className="text-sm font-semibold mb-1 text-gray-700">
                {f.label}
              </label>

              <input
                type={f.type}
                name={f.name}
                value={formData[f.name] || ""}
                onChange={handleChange}
                placeholder={f.label}
                className="input input-bordered w-full"
                required
              />
            </div>
          ))}

          {/* ✅ FEATURES */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-semibold mb-1 text-gray-700">
              Features
            </label>

            <input
              name="features"
              value={formData.features || ""}
              onChange={handleChange}
              placeholder="Waterproof, Lightweight"
              className="input input-bordered w-full"
            />
          </div>

          {/* ✅ DESCRIPTION */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-semibold mb-1 text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="textarea textarea-bordered w-full h-28"
            ></textarea>
          </div>

          {/* ✅ PAYMENT */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-semibold mb-1 text-gray-700">
              Payment Method
            </label>

            <select
              value={formData.paymentOptions[0] || ""}
              onChange={handlePaymentChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Payment</option>

              {paymentMethods.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* ✅ BUTTON */}
          <button className="btn btn-primary md:col-span-2 mt-4">
            Update Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;