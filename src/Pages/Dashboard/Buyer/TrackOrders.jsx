import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const TrackOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["track-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-orders/${user.email}`);
      return res.data;
    },
  });

  // ✅ Status Color Function
  const getStatusClass = (status) => {
    const s = status?.toLowerCase();

    if (s === "approved") return "badge-success";
    if (s === "rejected" || s === "cancelled") return "badge-error";
    if (s === "pending") return "badge-warning";

    return "badge-ghost";
  };

  // ✅ Format Status Text
  const formatStatus = (status) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">

        <div className="bg-base-100 p-6 rounded-2xl shadow">

          {/* ✅ Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Track Your Orders</h2>

            <span className="badge badge-outline">
              Total: {orders.length}
            </span>
          </div>

          {/* ✅ Loading */}
          {isLoading ? (
            <div className="text-center py-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (

            <div className="overflow-x-auto">
              <table className="table w-full">

                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">

                      {/* ✅ Order ID */}
                      <td className="font-mono text-xs">
                        #{order._id?.slice(-6).toUpperCase()}
                      </td>

                      {/* ✅ Product */}
                      <td>
                        <div className="font-semibold">
                          {order.productTitle}
                        </div>
                      </td>

                      {/* ✅ Quantity */}
                      <td>
                        <span className="badge badge-outline">
                          {order.quantity || 0} pcs
                        </span>
                      </td>

                      {/* ✅ Status (WITH COLOR ✅) */}
                      <td>
                        <span className={`badge ${getStatusClass(order.status)}`}>
                          {formatStatus(order.status)}
                        </span>
                      </td>

                      {/* ✅ Action */}
                      <td className="text-center">
                        <Link to={`/dashboard/track-order/${order._id}`}>
                          <button className="btn btn-xs btn-primary text-white">
                            Track
                          </button>
                        </Link>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

          {/* ✅ Empty State */}
          {!isLoading && orders.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No orders found.
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TrackOrders;