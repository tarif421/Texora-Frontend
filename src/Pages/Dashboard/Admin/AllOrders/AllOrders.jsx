import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";

import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AllOrders = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-orders", filterStatus, searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-orders?status=${filterStatus}&search=${searchTerm}`
      );
      return res.data;
    },
  });

  const getStatusBadge = (status) => {
    if (status === "Approved") return "badge-success";
    if (status === "Rejected") return "badge-error";
    return "badge-warning";
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this order?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/all-orders/${id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Order has been deleted.", "success");
        refetch();
      } else {
        Swal.fire("Error!", "Could not delete the order.", "error");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      Swal.fire("Error!", "Something went wrong on the server.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-base-100 rounded-3xl shadow-sm p-4 sm:p-6 lg:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                All Orders
              </h2>

              <p className="text-sm sm:text-base opacity-60 mt-2">
                Manage and monitor all customer orders smoothly.
              </p>
            </div>

            <div className="badge badge-primary badge-lg px-4 py-4 font-medium self-start md:self-center">
              Total Orders: {orders.length}
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-base-100 rounded-3xl shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">

            {/* Search */}
            <label className="input input-bordered flex items-center gap-2 w-full md:flex-1 h-12 rounded-2xl">
              <input
                type="text"
                className="grow text-sm sm:text-base"
                placeholder="Search by Order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>

            {/* Filter */}
            <select
              className="select select-bordered w-full md:w-60 rounded-2xl text-sm sm:text-base"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-base-100 rounded-3xl shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="table table-zebra min-w-[900px] lg:min-w-full">

              {/* Table Head */}
              <thead className="bg-base-300 text-base-content">
                <tr>
                  <th className="text-xs sm:text-sm">#</th>
                  <th className="text-xs sm:text-sm">Order ID</th>
                  <th className="text-xs sm:text-sm">User</th>
                  <th className="text-xs sm:text-sm hidden lg:table-cell">
                    Product
                  </th>
                  <th className="text-xs sm:text-sm">Qty</th>
                  <th className="text-xs sm:text-sm">Status</th>
                  <th className="text-center text-xs sm:text-sm">View</th>
                  <th className="text-center text-xs sm:text-sm">Delete</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  [1, 2, 3, 4].map((item) => (
                    <tr key={item}>
                      <td>
                        <div className="skeleton h-4 w-6"></div>
                      </td>

                      <td>
                        <div className="skeleton h-4 w-28"></div>
                      </td>

                      <td>
                        <div className="space-y-2">
                          <div className="skeleton h-4 w-24"></div>
                          <div className="skeleton h-3 w-36"></div>
                        </div>
                      </td>

                      <td className="hidden lg:table-cell">
                        <div className="skeleton h-4 w-28"></div>
                      </td>

                      <td>
                        <div className="skeleton h-5 w-12"></div>
                      </td>

                      <td>
                        <div className="skeleton h-5 w-16 rounded-full"></div>
                      </td>

                      <td>
                        <div className="skeleton h-8 w-14 mx-auto"></div>
                      </td>

                      <td>
                        <div className="skeleton h-8 w-8 mx-auto"></div>
                      </td>
                    </tr>
                  ))
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-16 text-center">
                      <div className="flex flex-col items-center">
                        <h2 className="text-xl sm:text-2xl font-bold">
                          No Orders Found
                        </h2>

                        <p className="text-sm opacity-60 mt-2">
                          Try changing the search or filter option.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  orders.map((order, index) => (
                    <tr
                      key={order._id}
                      className="hover transition duration-200"
                    >
                      {/* Index */}
                      <td className="font-semibold text-xs sm:text-sm">
                        {index + 1}
                      </td>

                      {/* Order ID */}
                      <td>
                        <div className="font-mono text-[11px] sm:text-xs break-all max-w-[180px]">
                          #{order._id}
                        </div>

                        <div className="text-[10px] sm:text-xs opacity-50 mt-1">
                          {order._id?.slice(-6).toUpperCase()}
                        </div>
                      </td>

                      {/* User */}
                      <td>
                        <div className="font-semibold text-sm sm:text-base">
                          {order.userName || "Unknown User"}
                        </div>

                        <div className="text-xs opacity-60 break-all">
                          {order.userEmail}
                        </div>
                      </td>

                      {/* Product */}
                      <td className="hidden lg:table-cell">
                        <div className="font-medium">
                          {order.productName}
                        </div>
                      </td>

                      {/* Quantity */}
                      <td>
                        <span className="badge badge-outline text-xs sm:text-sm px-3 py-2">
                          {order.quantity} pcs
                        </span>
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`badge ${getStatusBadge(
                            order.status
                          )} text-xs sm:text-sm px-3 py-2`}
                        >
                          {order.status}
                        </span>
                      </td>

                      {/* View */}
                      <td className="text-center">
                        <Link
                          to={`/dashboard/order-details/${order._id}`}
                          className="btn btn-xs sm:btn-sm rounded-xl btn-info text-white"
                        >
                          View
                        </Link>
                      </td>

                      {/* Delete */}
                      <td className="text-center">
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="btn btn-ghost btn-xs sm:btn-sm rounded-xl text-error hover:bg-error/10 transition"
                        >
                          <MdDeleteForever className="text-lg sm:text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
