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

  // Delete
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

          Swal.fire(
            "Deleted!",
            "Product has been deleted.",
            "success"
          );
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-200 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* Main Card */}
        <div className="bg-base-100 rounded-3xl shadow-sm p-4 sm:p-6 lg:p-8">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

            {/* Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                Manage Products
              </h2>

              <p className="text-sm sm:text-base text-gray-500 mt-2">
                Manage and update your products smoothly.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:max-w-md">

              <input
                type="text"
                placeholder="Search by name or category..."
                className="
                  input input-bordered
                  w-full
                  pl-11
                  rounded-2xl
                  text-sm sm:text-base
                "
                onChange={(e) => setSearch(e.target.value)}
              />

              <FaSearch className="absolute left-4 top-4 text-gray-400 text-sm" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-base-300">

            <table className="table table-zebra min-w-[950px] lg:min-w-full">

              {/* Table Head */}
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th className="text-xs sm:text-sm w-[15%]">
                    Image
                  </th>

                  <th className="text-xs sm:text-sm w-[35%]">
                    Product Info
                  </th>

                  <th className="text-xs sm:text-sm w-[15%]">
                    Price
                  </th>

                  <th className="text-xs sm:text-sm w-[15%]">
                    Payment
                  </th>

                  <th className="text-center text-xs sm:text-sm w-[20%]">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover transition duration-200"
                  >

                    {/* Product Image */}
                    <td>
                      <div className="flex justify-center">

                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-gray-200">

                          <img
                            src={product.productImage}
                            alt={product.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </td>

                    {/* Product Info */}
                    <td>
                      <div className="space-y-1">

                        <h3 className="font-bold text-sm sm:text-base text-gray-800">
                          {product.productName}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-500">
                          {product.category}
                        </p>

                        <p className="text-[11px] sm:text-xs text-gray-400">
                          ID: #{product._id?.slice(-6)}
                        </p>
                      </div>
                    </td>

                    {/* Price */}
                    <td>
                      <span className="font-semibold text-sm sm:text-base text-indigo-600">
                        ${product.price}
                      </span>
                    </td>

                    {/* Payment */}
                    <td>
                      <span className="badge badge-outline badge-sm sm:badge-md">
                        {product.paymentOptions?.[0] || "N/A"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex justify-center flex-wrap gap-2">

                        {/* Edit */}
                        <Link
                          to={`/dashboard/update-product/${product._id}`}
                        >
                          <button
                            className="
                              btn btn-xs sm:btn-sm
                              btn-info text-white
                              rounded-xl
                              flex items-center gap-1
                            "
                          >
                            <FaEdit />

                            <span className="hidden sm:inline">
                              Edit
                            </span>
                          </button>
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="
                            btn btn-xs sm:btn-sm
                            btn-error text-white
                            rounded-xl
                            flex items-center gap-1
                          "
                        >
                          <FaTrashAlt />

                          <span className="hidden sm:inline">
                            Delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Empty State */}
          {products.length === 0 && !isLoading && (
            <div className="text-center py-16">

              <h2 className="text-xl sm:text-2xl font-bold text-gray-600">
                No Products Found
              </h2>

              <p className="text-sm sm:text-base text-gray-400 mt-2">
                Products matching your search will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;