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
      const res = await axiosSecure.get(
        `/my-orders/${user.email}`
      );

      return res.data;
    },
  });

  // Status Color
  const getStatusClass = (status) => {
    const s = status?.toLowerCase();

    if (s === "approved") return "badge-success";

    if (s === "rejected" || s === "cancelled") {
      return "badge-error";
    }

    if (s === "pending") return "badge-warning";

    return "badge-ghost";
  };

  // Format Status
  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1)
    );
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
                Track Your Orders
              </h2>

              <p className="text-sm sm:text-base text-gray-500 mt-2">
                Monitor your order progress and delivery updates.
              </p>
            </div>

            <div className="badge badge-outline badge-lg px-4 py-4 font-medium self-start lg:self-center">
              Total Orders: {orders.length}
            </div>
          </div>

          {/* Loading */}
          {isLoading ? (
            <div className="py-16 flex justify-center">

              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-base-300">

              <table className="table table-zebra min-w-[850px] lg:min-w-full">

                {/* Table Head */}
                <thead className="bg-base-200 text-gray-700">
                  <tr>
                    <th className="text-xs sm:text-sm">
                      Order ID
                    </th>

                    <th className="text-xs sm:text-sm">
                      Product
                    </th>

                    <th className="text-xs sm:text-sm">
                      Quantity
                    </th>

                    <th className="text-xs sm:text-sm">
                      Status
                    </th>

                    <th className="text-center text-xs sm:text-sm">
                      Action
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover transition duration-200"
                    >

                      {/* Order ID */}
                      <td>
                        <div className="font-mono text-xs sm:text-sm font-semibold">
                          #
                          {order._id
                            ?.slice(-6)
                            .toUpperCase()}
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
                          className={`badge badge-sm sm:badge-md ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {formatStatus(order.status)}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="text-center">
                        <Link
                          to={`/dashboard/track-order/${order._id}`}
                        >
                          <button
                            className="
                              btn btn-xs sm:btn-sm
                              btn-primary
                              rounded-xl
                              text-white
                            "
                          >
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

          {/* Empty State */}
          {!isLoading && orders.length === 0 && (
            <div className="text-center py-16">

              <div className="text-5xl mb-4">
                📦
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-700">
                No Orders Found
              </h2>

              <p className="text-sm sm:text-base text-gray-400 mt-2">
                Your tracked orders will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrders;
