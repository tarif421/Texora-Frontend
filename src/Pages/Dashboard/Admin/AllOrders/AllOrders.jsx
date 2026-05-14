import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AllOrders = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
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
    if (status === "Delivered") return "badge-primary";
    if (status === "Shipped") return "badge-info";
    return "badge-warning";
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-base-100 rounded-2xl shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-base-content">
                All Orders
              </h2>
              <p className="text-base-content/60 mt-1">
                Manage and view all customer orders from here.
              </p>
            </div>

            <div className="badge badge-primary badge-lg p-4 font-semibold">
              Total Orders: {orders.length}
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-base-100 rounded-2xl shadow p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <label className="input input-bordered flex items-center gap-2 w-full md:max-w-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>

              <input
                type="text"
                className="grow"
                placeholder="Search by Order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>

            <select
              className="select select-bordered w-full md:max-w-xs"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* DaisyUI Table */}
        <div className="bg-base-100 rounded-2xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-base-300 text-base-content">
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <tr key={item}>
                        <td>
                          <div className="skeleton h-5 w-6"></div>
                        </td>
                        <td>
                          <div className="skeleton h-5 w-36"></div>
                        </td>
                        <td>
                          <div className="space-y-2">
                            <div className="skeleton h-5 w-32"></div>
                            <div className="skeleton h-4 w-44"></div>
                          </div>
                        </td>
                        <td>
                          <div className="skeleton h-5 w-36"></div>
                        </td>
                        <td>
                          <div className="skeleton h-5 w-12"></div>
                        </td>
                        <td>
                          <div className="skeleton h-6 w-20 rounded-full"></div>
                        </td>
                        <td>
                          <div className="skeleton h-8 w-16 mx-auto"></div>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12">
                      <div className="flex flex-col items-center">
                        <div className="text-5xl mb-3">📦</div>
                        <h3 className="text-xl font-bold">No Orders Found</h3>
                        <p className="text-base-content/60 mt-1">
                          There are no orders matching your search or filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  orders.map((order, index) => (
                    <tr key={order._id} className="hover">
                      <td className="font-bold">{index + 1}</td>

                      <td>
                        <div className="font-mono text-xs font-semibold">
                          #{order._id}
                        </div>
                        <div className="text-xs opacity-50">
                          Short: #{order._id?.slice(-6).toUpperCase()}
                        </div>
                      </td>

                      <td>
                        <div className="font-bold">
                          {order.userName ||
                            `${order.firstName || ""} ${
                              order.lastName || ""
                            }` ||
                            "Unknown User"}
                        </div>
                        <div className="text-sm opacity-60">
                          {order.userEmail || order.email || "No email"}
                        </div>
                      </td>

                      <td>
                        <div className="font-semibold">
                          {order.productName ||
                            order.productTitle ||
                            "Unknown Product"}
                        </div>
                      </td>

                      <td>
                        <span className="badge badge-outline">
                          {order.quantity || 0} pcs
                        </span>
                      </td>

                      <td>
                        <span
                          className={`badge ${getStatusBadge(
                            order.status || order.orderStatus
                          )} font-semibold`}
                        >
                          {order.status || order.orderStatus || "Pending"}
                        </span>
                      </td>

                      <td className="text-center">
                        <Link
                          to={`/dashboard/order-details/${order._id}`}
                          className="btn btn-sm btn-info text-white"
                        >
                          View
                        </Link>
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