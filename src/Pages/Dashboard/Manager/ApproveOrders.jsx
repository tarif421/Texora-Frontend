import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaPlus, FaEye } from "react-icons/fa";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ApprovedOrders = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [trackingModal, setTrackingModal] = useState(false);

  const [trackingData, setTrackingData] = useState({
    location: "",
    note: "",
    status: "Cutting Completed",
  });

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["approved-orders"],

    queryFn: async () => {
      const res = await axiosSecure.get("/approved-orders");

      return res.data;
    },
  });

  const handleAddTracking = async () => {
    await axiosSecure.post(
      `/order/${selectedOrder._id}/tracking`,
      trackingData
    );

    setTrackingModal(false);

    setTrackingData({
      location: "",
      note: "",
      status: "Cutting Completed",
    });

    refetch();
  };

  return (
    <div className="min-h-screen bg-base-200 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* Main Card */}
        <div className="bg-base-100 rounded-3xl shadow-sm p-4 sm:p-6 lg:p-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                Approved Orders
              </h2>

              <p className="text-sm sm:text-base text-gray-500 mt-2">
                Manage approved orders and tracking updates smoothly.
              </p>
            </div>

            <div className="badge badge-primary badge-lg px-4 py-4 font-medium self-start md:self-center">
              Total Orders: {orders.length}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-base-300">

            <table className="table table-zebra min-w-[950px] lg:min-w-full">

              {/* Table Head */}
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th className="text-xs sm:text-sm">Order ID</th>

                  <th className="text-xs sm:text-sm">User</th>

                  <th className="text-xs sm:text-sm">Product</th>

                  <th className="text-xs sm:text-sm">Quantity</th>

                  <th className="text-xs sm:text-sm">
                    Approved Date
                  </th>

                  <th className="text-center text-xs sm:text-sm">
                    Actions
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
                      <div className="font-mono text-xs sm:text-sm">
                        #{order._id?.slice(-6)}
                      </div>
                    </td>

                    {/* User */}
                    <td>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                          {order.firstName} {order.lastName}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-500 break-all">
                          {order.email}
                        </p>
                      </div>
                    </td>

                    {/* Product */}
                    <td>
                      <div className="font-medium text-sm sm:text-base">
                        {order.productTitle}
                      </div>
                    </td>

                    {/* Quantity */}
                    <td>
                      <span className="badge badge-outline badge-sm sm:badge-md">
                        {order.quantity || 0}
                      </span>
                    </td>

                    {/* Date */}
                    <td>
                      <span className="text-xs sm:text-sm">
                        {new Date(order.approvedAt).toLocaleDateString()}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex items-center justify-center gap-2">

                        {/* Add Tracking */}
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setTrackingModal(true);
                          }}
                          className="
                            btn btn-xs sm:btn-sm
                            btn-primary
                            rounded-xl
                          "
                        >
                          <FaPlus />

                          <span className="hidden sm:inline">
                            Track
                          </span>
                        </button>

                        {/* View Tracking */}
                        <button
                          onClick={() =>
                            alert(
                              JSON.stringify(
                                order.trackingHistory || [],
                                null,
                                2
                              )
                            )
                          }
                          className="
                            btn btn-xs sm:btn-sm
                            btn-info text-white
                            rounded-xl
                          "
                        >
                          <FaEye />

                          <span className="hidden sm:inline">
                            View
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
          {orders.length === 0 && (
            <div className="text-center py-14">

              <h2 className="text-xl sm:text-2xl font-bold text-gray-600">
                No Approved Orders
              </h2>

              <p className="text-sm sm:text-base text-gray-400 mt-2">
                Approved orders will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tracking Modal */}
      {trackingModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center px-3 z-50">

          <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-5 sm:p-7">

            {/* Modal Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Add Tracking
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Update shipment or production progress
              </p>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Location
              </label>

              <input
                type="text"
                placeholder="Enter location"
                className="
                  input input-bordered
                  w-full
                  rounded-2xl
                  text-sm sm:text-base
                "
                onChange={(e) =>
                  setTrackingData({
                    ...trackingData,
                    location: e.target.value,
                  })
                }
              />
            </div>

            {/* Note */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Note
              </label>

              <input
                type="text"
                placeholder="Write a note"
                className="
                  input input-bordered
                  w-full
                  rounded-2xl
                  text-sm sm:text-base
                "
                onChange={(e) =>
                  setTrackingData({
                    ...trackingData,
                    note: e.target.value,
                  })
                }
              />
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Status
              </label>

              <select
                className="
                  select select-bordered
                  w-full
                  rounded-2xl
                  text-sm sm:text-base
                "
                onChange={(e) =>
                  setTrackingData({
                    ...trackingData,
                    status: e.target.value,
                  })
                }
              >
                <option>Cutting Completed</option>

                <option>Sewing Started</option>

                <option>Finishing</option>

                <option>QC Checked</option>

                <option>Packed</option>

                <option>Shipped</option>

                <option>Out for Delivery</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">

              <button
                onClick={() => setTrackingModal(false)}
                className="
                  btn
                  rounded-2xl
                  flex-1
                "
              >
                Cancel
              </button>

              <button
                onClick={handleAddTracking}
                className="
                  btn btn-primary
                  rounded-2xl
                  flex-1
                "
              >
                Save Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedOrders;