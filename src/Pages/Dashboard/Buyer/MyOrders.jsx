import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router";
import { FaEye, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useEffect } from "react";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams, setSearchParams] = useSearchParams();

  const isSuccess = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { user } = useAuth();

  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-orders", user?.email],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/my-order/${user.email}`);

      return res.data;
    },
  });
  useEffect(() => {
    if (isSuccess === "true" && orderId) {
      axiosSecure
        .patch(`/orders/pay/${orderId}`)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();

            Swal.fire({
              title: "Payment Successful!",
              text: "Your order has been paid successfully.",
              icon: "success",
            });

            setSearchParams({});
          }
        })
        .catch((err) => {
          console.error("Error updating payment status:", err);
        });
    }
  }, [isSuccess, orderId, axiosSecure, refetch, setSearchParams]);
  // Cancel Order
  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel this order?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Cancel",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.patch(`/orders/${id}/cancel`);

    if (res.data.modifiedCount > 0) {
      Swal.fire("Cancelled!", "Order has been cancelled", "success");

      refetch();
    }
  };

  // Status Badge
  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();

    if (s === "approved") return "badge-success";

    if (s === "rejected") return "badge-error";

    if (s === "cancelled") return "badge-error";

    return "badge-warning";
  };

  return (
    <div className="min-h-screen bg-base-200 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Card */}
        <div className="bg-base-100 rounded-3xl shadow-sm p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                My Orders
              </h2>

              <p className="text-sm sm:text-base text-gray-500 mt-2">
                Track and manage all your placed orders.
              </p>
            </div>

            <div className="badge badge-primary badge-lg px-4 py-4 font-medium self-start lg:self-center">
              Total Orders: {orders.length}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-base-300">
            <table className="table table-zebra min-w-[900px] lg:min-w-full">
              {/* Table Head */}
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th className="text-xs sm:text-sm">Order ID</th>

                  <th className="text-xs sm:text-sm">Product</th>

                  <th className="text-xs sm:text-sm">Quantity</th>

                  <th className="text-xs sm:text-sm">Status</th>

                  <th className="text-xs sm:text-sm">Payment</th>

                  <th className="text-center text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {isLoading
                  ? [1, 2, 3, 4].map((item) => (
                      <tr key={item}>
                        <td>
                          <div className="skeleton h-5 w-24 rounded"></div>
                        </td>

                        <td>
                          <div className="skeleton h-5 w-32 rounded"></div>
                        </td>

                        <td>
                          <div className="skeleton h-5 w-16 rounded"></div>
                        </td>

                        <td>
                          <div className="skeleton h-5 w-20 rounded-full"></div>
                        </td>

                        <td>
                          <div className="skeleton h-5 w-20 rounded-full"></div>
                        </td>

                        <td>
                          <div className="flex justify-center gap-2">
                            <div className="skeleton h-8 w-16 rounded-xl"></div>

                            <div className="skeleton h-8 w-16 rounded-xl"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : orders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover transition duration-200"
                      >
                        {/* Order ID */}
                        <td>
                          <div className="font-mono text-xs sm:text-sm font-semibold">
                            #{order._id?.slice(-6)}
                          </div>
                        </td>

                        {/* Product */}
                        <td>
                          <div className="font-semibold text-sm sm:text-base text-gray-800">
                            {order.productTitle}
                          </div>
                        </td>

                        {/* Quantity */}
                        <td>
                          <span className="badge badge-outline badge-sm sm:badge-md">
                            {order.quantity || 0} pcs
                          </span>
                        </td>

                        {/* Status */}
                        <td>
                          <span
                            className={`badge badge-sm sm:badge-md ${getStatusBadge(
                              order.status,
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>

                        {/* Payment */}
                        <td>
                          <span
                            className={`badge badge-sm sm:badge-md ${
                              order.paymentStatus === "paid"
                                ? "badge-success text-white"
                                : "badge-warning"
                            }`}
                          >
                            {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="flex justify-center flex-wrap gap-2">
                            {/* View */}
                            <Link to={`/dashboard/details-order/${order._id}`}>
                              <button
                                className="
                                btn btn-xs sm:btn-sm
                                btn-info text-white
                                rounded-xl
                                flex items-center gap-1
                              "
                              >
                                <FaEye />

                                <span className="hidden sm:inline">View</span>
                              </button>
                            </Link>

                            {/* Cancel */}
                            {order.status === "pending" && (
                              <button
                                onClick={() => handleCancel(order._id)}
                                className="
                                btn btn-xs sm:btn-sm
                                btn-error text-white
                                rounded-xl
                                flex items-center gap-1
                              "
                              >
                                <FaTimes />

                                <span className="hidden sm:inline">Cancel</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {orders.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-600">
                No Orders Yet
              </h2>

              <p className="text-sm sm:text-base text-gray-400 mt-2">
                Your placed orders will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
