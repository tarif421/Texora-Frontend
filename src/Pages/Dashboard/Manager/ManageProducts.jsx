import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaEdit, FaTrashAlt, FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const { role, isLoading } = useRole();

  const {
    data: products = [],
    refetch,
  } = useQuery({
    queryKey: ["manager-products", user?.email, search],
    enabled: !!user?.email && role === "manager",
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products/manager-only?email=${user?.email}&search=${search}`
      );
      return res.data;
    },
  });

  // ✅ Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/products/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Product has been deleted.", "success");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        <div className="bg-base-100 rounded-2xl shadow p-6">

          {/* ✅ Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Manage Products
            </h2>

            {/* ✅ Search */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search by name or category..."
                className="input input-bordered w-full pl-10"
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* ✅ Table */}
          <div className="overflow-x-auto rounded-lg">
            <table className="table w-full">

              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="w-[15%]">Image</th>
                  <th className="w-[35%]">Product Info</th>
                  <th className="w-[15%]">Price</th>
                  <th className="w-[15%]">Payment Mode</th>
                  <th className="w-[20%] text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">

                    {/* ✅ Image */}
                    <td>
                      <div className="flex justify-center">
                        <div className="w-14 h-14 rounded-xl overflow-hidden border">
                          <img
                            src={product.productImage}
                            alt="product"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </td>

                    {/* ✅ Product Info */}
                    <td>
                      <div className="font-bold text-gray-800">
                        {product.productName}
                      </div>

                      <div className="text-xs opacity-50">
                        {product.category}
                      </div>

                      <div className="text-xs opacity-40">
                        ID: #{product._id?.slice(-6)}
                      </div>
                    </td>

                    {/* ✅ Price */}
                    <td>
                      <span className="font-semibold text-indigo-600">
                        ${product.price}
                      </span>
                    </td>

                    {/* ✅ Payment */}
                    <td>
                      <span className="badge badge-outline">
                        {product.paymentOptions?.[0] || "N/A"}
                      </span>
                    </td>

                    {/* ✅ Actions */}
                    <td>
                      <div className="flex justify-center flex-wrap gap-2">

                        <Link to={`/dashboard/update-product/${product._id}`}>
                          <button className="btn btn-xs btn-info text-white flex items-center gap-1">
                            <FaEdit /> Edit
                          </button>
                        </Link>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="btn btn-xs btn-error text-white flex items-center gap-1"
                        >
                          <FaTrashAlt /> Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* ✅ Empty */}
          {products.length === 0 && !isLoading && (
            <div className="text-center py-20 text-gray-400">
              No products found.
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ManageProducts;