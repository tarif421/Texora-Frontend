import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PendingOrders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: pendingOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending-orders"],

    queryFn: async () => {
      const res = await axiosSecure.get("/pending-orders");

      return res.data;
    },
  });

  // Approve
  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve this order?",
      text: "This order status will be changed to Approved.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Approve",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/orders/${id}/approve`);

      if (res.data.modifiedCount > 0) {
        Swal.fire(
          "Approved!",
          "Order has been approved.",
          "success"
        );

        refetch();
      } else {
        Swal.fire(
          "Info",
          "Order status was not changed.",
          "info"
        );
      }
    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        "Failed to approve order.",
        "error"
      );
    }
  };

  // Reject
  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject this order?",
      text: "This order status will be changed to Rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Reject",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/orders/${id}/reject`);

      if (res.data.modifiedCount > 0) {
        Swal.fire(
          "Rejected!",
          "Order has been rejected.",
          "success"
        );

        refetch();
      } else {
        Swal.fire(
          "Info",
          "Order status was not changed.",
          "info"
        );
      }
    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        "Failed to reject order.",
        "error"
      );
    }
  };

  // Date Format
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-base-200 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-base-100 rounded-3xl shadow-sm p-4 sm:p-6 lg:p-8 mb-6">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            {/* Left */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                Pending Orders
              </h2>

              <p className="text-sm sm:text-base text-gray-500 mt-2">
                Review, approve or reject orders smoothly.
              </p>
            </div>

            {/* Right */}
            <div className="badge badge-warning badge-lg px-4 py-4 font-medium self-start lg:self-center">
              Pending: {pendingOrders.length}
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-base-100 rounded-3xl shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="table table-zebra min-w-[1050px] lg:min-w-full">

              {/* Head */}
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th className="text-xs sm:text-sm">#</th>

                  <th className="text-xs sm:text-sm">
                    Order ID
                  </th>

                  <th className="text-xs sm:text-sm">
                    User
                  </th>

                  <th className="text-xs sm:text-sm">
                    Product
                  </th>

                  <th className="text-xs sm:text-sm">
                    Quantity
                  </th>

                  <th className="text-xs sm:text-sm">
                    Order Date
                  </th>

                  <th className="text-center text-xs sm:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {isLoading ? (
                  [1, 2, 3, 4, 5].map((item) => (
                    <tr key={item}>

                      <td>
                        <div className="skeleton h-5 w-6 rounded"></div>
                      </td>

                      <td>
                        <div className="skeleton h-5 w-32 rounded"></div>
                      </td>

                      <td>
                        <div className="space-y-2">
                          <div className="skeleton h-5 w-28 rounded"></div>

                          <div className="skeleton h-4 w-40 rounded"></div>
                        </div>
                      </td>

                      <td>
                        <div className="skeleton h-5 w-28 rounded"></div>
                      </td>

                      <td>
                        <div className="skeleton h-5 w-16 rounded"></div>
                      </td>

                      <td>
                        <div className="skeleton h-5 w-24 rounded"></div>
                      </td>

                      <td>
                        <div className="flex justify-center gap-2">
                          <div className="skeleton h-8 w-16 rounded-xl"></div>

                          <div className="skeleton h-8 w-16 rounded-xl"></div>

                          <div className="skeleton h-8 w-16 rounded-xl"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : pendingOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-16"
                    >
                      <div className="flex flex-col items-center">

                        <div className="text-5xl mb-4">
                          ✅
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-gray-700">
                          No Pending Orders
                        </h3>

                        <p className="text-sm sm:text-base text-gray-400 mt-2">
                          All orders are already reviewed.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  pendingOrders.map((order, index) => (
                    <tr
                      key={order._id}
                      className="hover transition duration-200"
                    >

                      {/* Index */}
                      <td className="font-semibold text-sm">
                        {index + 1}
                      </td>

                      {/* Order ID */}
                      <td>
                        <div className="font-mono text-xs sm:text-sm font-semibold break-all">
                          #{order._id}
                        </div>

                        <div className="text-[11px] sm:text-xs text-gray-400 mt-1">
                          Short: #
                          {order._id
                            ?.slice(-6)
                            .toUpperCase()}
                        </div>
                      </td>

                      {/* User */}
                      <td>
                        <div className="space-y-1">

                          <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                            {order.userName ||
                              `${order.firstName || ""} ${
                                order.lastName || ""
                              }`.trim() ||
                              "Unknown User"}
                          </h3>

                          <p className="text-xs sm:text-sm text-gray-500 break-all">
                            {order.userEmail ||
                              order.email ||
                              "No email"}
                          </p>
                        </div>
                      </td>

                      {/* Product */}
                      <td>
                        <div className="font-medium text-sm sm:text-base">
                          {order.productName ||
                            order.productTitle ||
                            "Unknown Product"}
                        </div>
                      </td>

                      {/* Quantity */}
                      <td>
                        <span className="badge badge-outline badge-sm sm:badge-md">
                          {order.quantity || 0} pcs
                        </span>
                      </td>

                      {/* Date */}
                      <td>
                        <span className="text-xs sm:text-sm">
                          {formatDate(order.createdAt)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex justify-center flex-wrap gap-2">

                          {/* Approve */}
                          <button
                            onClick={() =>
                              handleApprove(order._id)
                            }
                            className="
                              btn btn-xs sm:btn-sm
                              btn-success text-white
                              rounded-xl
                            "
                          >
                            Approve
                          </button>

                          {/* Reject */}
                          <button
                            onClick={() =>
                              handleReject(order._id)
                            }
                            className="
                              btn btn-xs sm:btn-sm
                              btn-error text-white
                              rounded-xl
                            "
                          >
                            Reject
                          </button>

                          {/* View */}
                          <Link
                            to={`/dashboard/order-details/${order._id}`}
                            className="
                              btn btn-xs sm:btn-sm
                              btn-info text-white
                              rounded-xl
                            "
                          >
                            View
                          </Link>
                        </div>
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

export default PendingOrders;
