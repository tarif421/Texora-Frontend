import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // ডাটা ফেচিং
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-orders", filterStatus, searchTerm],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/all-orders?status=${filterStatus}&search=${searchTerm}`,
      );
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Order ID..."
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="font-mono text-xs">{order._id}</td>
                  <td>
                    <div className="font-bold">{order.userName}</div>
                    <div className="text-sm opacity-50">{order.userEmail}</div>
                  </td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "Approved"
                          ? "badge-success"
                          : order.status === "Rejected"
                            ? "badge-error"
                            : "badge-warning"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/order-details/${order._id}`}
                      className="btn btn-ghost btn-xs bg-indigo-100 text-indigo-600"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
