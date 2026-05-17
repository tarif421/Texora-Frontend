import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaEye, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-orders/${user.email}`);
      return res.data;
    },
  });

  // ✅ Cancel order
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

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();

    if (s === "approved") return "badge-success";
    if (s === "rejected") return "badge-error";
    if (s === "cancelled") return "badge-neutral";
    return "badge-warning";
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-3xl font-bold mb-6">My Orders</h2>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover">
                    {/* ID */}
                    <td className="font-mono text-xs">
                      #{order._id?.slice(-6)}
                    </td>

                    {/* Product */}
                    <td>
                      <div className="font-semibold">{order.productTitle}</div>
                    </td>

                    {/* Quantity */}
                    <td>{order.quantity || 0} pcs</td>

                    {/* Status */}
                    <td>
                      <span className={`badge ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>

                    {/* Payment */}
                    <td>
                      <span className="badge badge-outline">
                        {order.paymentStatus || "unpaid"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex justify-center gap-2">
                        {/* View */}
                        <Link to={`/dashboard/details-order/${order._id}`}>
                          <button className="btn btn-xs btn-info text-white">
                            <FaEye /> View
                          </button>
                        </Link>

                        {/* Cancel */}
                        {order.status === "pending" && (
                          <button
                            onClick={() => handleCancel(order._id)}
                            className="btn btn-xs btn-error text-white"
                          >
                            <FaTimes /> Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && !isLoading && (
            <div className="text-center py-16 text-gray-400">
              You have no orders yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
