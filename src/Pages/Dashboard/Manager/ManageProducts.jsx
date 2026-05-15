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

  // ডাটা ফেচিং
  const {
    data: products = [],
    refetch,
    
  } = useQuery({
    // queryKey-তে user.email থাকা জরুরি, যাতে ইউজার পাল্টালে ডাটা অটো রিফ্রেশ হয়
    queryKey: ["manager-products", user?.email, search],
    enabled: !!user?.email && role === "manager",
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products/manager-only?email=${user?.email}&search=${search}`,
      );
      return res.data;
    },
  });

  // ডিলিট হ্যান্ডলার (কনফার্মেশন সহ)
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
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Manage Products</h2>

        {/* সার্চ বক্স */}
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

      <div className="overflow-x-auto rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Payment Mode</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{product.productName}</div>
                  <div className="text-xs opacity-50">{product.category}</div>
                </td>
                <td className="font-semibold text-indigo-600">
                  ${product.price}
                </td>
                <td>
                  <span className="badge badge-ghost">
                    {product.paymentOptions?.[0] || "N/A"}
                  </span>
                </td>
                <td className="text-center space-x-3">
                  <Link to={`/dashboard/update-product/${product._id}`}>
                    <button className="btn btn-sm btn-info text-white">
                      <FaEdit /> Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && !isLoading && (
        <div className="text-center py-20 text-gray-400">
          No products found.
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
