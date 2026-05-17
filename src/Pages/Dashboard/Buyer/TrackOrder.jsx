import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const TrackOrder = () => {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: order = {} } = useQuery({
    queryKey: ["track-order", orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order/${orderId}`);
      return res.data;
    },
  });

  const tracking = order.trackingHistory || [];

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold">
          Track Order #{order._id?.slice(-6)}
        </h2>

        {tracking.length === 0 ? (
          <p>No tracking updates yet.</p>
        ) : (
          <div className="space-y-6">
            {tracking.map((step, index) => {
              const isLatest = index === tracking.length - 1;

              return (
                <div key={index} className="flex gap-4">
                  {/* timeline dot */}
                  <div>
                    <div
                      className={`w-4 h-4 rounded-full ${
                        isLatest ? "bg-green-500" : "bg-indigo-500"
                      }`}
                    ></div>
                  </div>

                  {/* content */}
                  <div
                    className={`p-4 rounded-xl w-full ${
                      isLatest ? "bg-green-100" : "bg-base-100"
                    }`}
                  >
                    <h4 className="font-bold">{step.status}</h4>
                    <p>📍 {step.location}</p>
                    <p>{step.note}</p>
                    <p className="text-xs">
                      {new Date(step.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
