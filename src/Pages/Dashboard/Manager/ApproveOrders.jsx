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
      trackingData,
    );

    setTrackingModal(false);
    setTrackingData({ location: "", note: "", status: "" });
    refetch();
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-base-100 rounded-2xl shadow p-6">
          <h2 className="text-3xl font-bold mb-6">Approved Orders</h2>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Approved Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>#{order._id?.slice(-6)}</td>

                    <td>
                      {order.firstName} {order.lastName}
                      <div className="text-xs">{order.email}</div>
                    </td>

                    <td>{order.productTitle}</td>

                    <td>{order.quantity || 0}</td>

                    <td>{new Date(order.approvedAt).toLocaleDateString()}</td>

                    <td className="text-center">
                      <div className="flex gap-2 justify-center">
                        {/* ✅ Add Tracking */}
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setTrackingModal(true);
                          }}
                          className="btn btn-xs btn-primary"
                        >
                          <FaPlus /> Track
                        </button>

                        {/* ✅ View Tracking */}
                        <button
                          onClick={() =>
                            alert(
                              JSON.stringify(
                                order.trackingHistory || [],
                                null,
                                2,
                              ),
                            )
                          }
                          className="btn btn-xs btn-info text-white"
                        >
                          <FaEye /> View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ✅ Tracking Modal */}
      {trackingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-xl font-bold mb-4">Add Tracking</h3>

            <input
              type="text"
              placeholder="Location"
              className="input input-bordered w-full mb-2"
              onChange={(e) =>
                setTrackingData({ ...trackingData, location: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Note"
              className="input input-bordered w-full mb-2"
              onChange={(e) =>
                setTrackingData({ ...trackingData, note: e.target.value })
              }
            />

            <select
              className="select select-bordered w-full mb-4"
              onChange={(e) =>
                setTrackingData({ ...trackingData, status: e.target.value })
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

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setTrackingModal(false)}
                className="btn btn-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleAddTracking}
                className="btn btn-sm btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedOrders;
