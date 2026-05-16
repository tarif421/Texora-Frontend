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
        Swal.fire("Approved!", "Order has been approved.", "success");
        refetch();
      } else {
        Swal.fire("Info", "Order status was not changed.", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to approve order.", "error");
    }
  };

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
        Swal.fire("Rejected!", "Order has been rejected.", "success");
        refetch();
      } else {
        Swal.fire("Info", "Order status was not changed.", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to reject order.", "error");
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-base-100 rounded-2xl shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-base-content">
                Pending Orders
              </h2>
              <p className="text-base-content/60 mt-1">
                Review, approve or reject all orders waiting for approval.
              </p>
            </div>

            <div className="badge badge-warning badge-lg p-4 font-semibold">
              Pending: {pendingOrders.length}
            </div>
          </div>
        </div>

        {/* Table */}
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
                  <th>Order Date</th>
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
                          <div className="skeleton h-5 w-14"></div>
                        </td>
                        <td>
                          <div className="skeleton h-5 w-24"></div>
                        </td>
                        <td>
                          <div className="flex justify-center gap-2">
                            <div className="skeleton h-8 w-16"></div>
                            <div className="skeleton h-8 w-16"></div>
                            <div className="skeleton h-8 w-16"></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : pendingOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12">
                      <div className="flex flex-col items-center">
                        <div className="text-5xl mb-3">✅</div>
                        <h3 className="text-xl font-bold">
                          No Pending Orders
                        </h3>
                        <p className="text-base-content/60 mt-1">
                          All orders are already reviewed.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  pendingOrders.map((order, index) => (
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
                            }`.trim() ||
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

                      <td>{formatDate(order.createdAt)}</td>

                      <td>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleApprove(order._id)}
                            className="btn btn-xs btn-success text-white"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => handleReject(order._id)}
                            className="btn btn-xs btn-error text-white"
                          >
                            Reject
                          </button>

                          <Link
                            to={`/dashboard/order-details/${order._id}`}
                            className="btn btn-xs btn-info text-white"
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