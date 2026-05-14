//  review

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  // URL থেকে success এবং orderId সংগ্রহ
  const queryParams = new URLSearchParams(location.search);
  const isSuccess = queryParams.get("success");
  const orderIdFromUrl = queryParams.get("orderId");

  // ডাটা লোড করার ফাংশন
  const fetchOrders = async () => {
    try {
      const res = await axiosSecure.get(`/orders/${user?.email}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  // পেমেন্ট সাকসেস হ্যান্ডেল করা
  useEffect(() => {
    if (isSuccess === "true" && orderIdFromUrl) {
      axiosSecure.patch(`/orders/pay/${orderIdFromUrl}`).then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Payment Successful! Status Updated.");
          navigate("/dashboard/my-orders", { replace: true });
          fetchOrders(); // টেবিল রিফ্রেশ
        }
      });
    }
  }, [isSuccess, orderIdFromUrl]);

  // অর্ডার ক্যানসেল লজিক
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/orders/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success("Order Cancelled");
          fetchOrders();
        }
      }
    });
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="text-xs font-mono text-gray-500">
                  #{order._id.slice(-6)}
                </td>
                <td className="font-semibold">{order.productTitle}</td>
                <td>{order.quantity}</td>
                <td>
                  <span
                    className={`badge badge-sm font-medium p-3 ${
                      order.status === "pending"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`font-bold ${
                      order.paymentStatus === "paid"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                  </span>
                </td>
                <td className="flex gap-2">
                  {/* View Button */}
                  <button
                    onClick={() =>
                      navigate(`/dashboard/order-details/${order._id}`)
                    }
                    className="btn btn-sm btn-info text-white"
                  >
                    View
                  </button>

                  {/* Cancel Button - Only visible if Pending */}
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
