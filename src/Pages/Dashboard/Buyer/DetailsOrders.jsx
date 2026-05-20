import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

 const DetailsOrder = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: order = {} } = useQuery({
    queryKey: ["order-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${id}`);
      return res.data;
    },
  });

  const tracking = order?.trackingHistory || [];

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ✅ ORDER INFO */}
        <div className="bg-base-100 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-4">Order Details</h2>

          <p>
            <b>Product:</b> {order.productTitle}
          </p>
          <p>
            <b>Quantity:</b> {order.quantity}
          </p>
          <p>
            <b>Total:</b> ${order.totalPrice}
          </p>
          <p>
            <b>Status:</b> {order.status}
          </p>
        </div>

        {/* ✅ TRACKING TIMELINE */}
        <div className="bg-base-100 p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold mb-4">Tracking Timeline</h3>

          {tracking.length === 0 ? (
            <p className="text-gray-400">No tracking updates yet.</p>
          ) : (
            <div className="space-y-4">
              {tracking.map((t, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                    {index !== tracking.length - 1 && (
                      <div className="w-1 h-10 bg-indigo-200"></div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold">{t.status}</h4>
                    <p className="text-sm">📍 {t.location}</p>
                    <p className="text-sm text-gray-500">{t.note}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(t.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsOrder;
