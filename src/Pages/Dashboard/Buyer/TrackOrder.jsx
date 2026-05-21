import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const TrackOrder = () => {
  const { orderId } = useParams();

  const axiosSecure = useAxiosSecure();

  const { data: order = {}, isLoading } = useQuery({
    queryKey: ["track-order", orderId],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/buyer-order/${orderId}`
      );

      return res.data;
    },
  });

  const tracking = order.trackingHistory || [];

  return (
    <div className="min-h-screen bg-base-200 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-base-100 rounded-3xl shadow-sm p-5 sm:p-7 lg:p-8 mb-6">

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
            Track Order
          </h2>

          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Order ID:
            <span className="font-mono ml-2 text-indigo-600">
              #{order._id?.slice(-6)}
            </span>
          </p>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="space-y-4">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-base-100 rounded-2xl p-5 shadow-sm"
              >
                <div className="space-y-3">

                  <div className="skeleton h-5 w-40 rounded"></div>

                  <div className="skeleton h-4 w-52 rounded"></div>

                  <div className="skeleton h-4 w-full rounded"></div>

                  <div className="skeleton h-3 w-32 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : tracking.length === 0 ? (

          /* Empty State */
          <div className="bg-base-100 rounded-3xl shadow-sm py-16 px-6 text-center">

            <div className="text-5xl mb-4">
              📦
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-700">
              No Tracking Updates Yet
            </h3>

            <p className="text-sm sm:text-base text-gray-400 mt-2">
              Tracking information will appear here once updated.
            </p>
          </div>
        ) : (

          /* Timeline */
          <div className="space-y-5">

            {tracking.map((step, index) => {
              const isLatest =
                index === tracking.length - 1;

              return (
                <div
                  key={index}
                  className="flex gap-3 sm:gap-5"
                >

                  {/* Timeline Line + Dot */}
                  <div className="flex flex-col items-center">

                    {/* Dot */}
                    <div
                      className={`
                        w-4 h-4 sm:w-5 sm:h-5
                        rounded-full
                        mt-2
                        ${
                          isLatest
                            ? "bg-green-500"
                            : "bg-indigo-500"
                        }
                      `}
                    ></div>

                    {/* Line */}
                    {index !== tracking.length - 1 && (
                      <div className="w-[2px] flex-1 bg-gray-300 mt-1"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`
                      flex-1
                      rounded-3xl
                      p-4 sm:p-5 lg:p-6
                      shadow-sm
                      transition
                      ${
                        isLatest
                          ? "bg-green-50 border border-green-200"
                          : "bg-base-100"
                      }
                    `}
                  >

                    {/* Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">

                      <h4
                        className={`
                          text-lg sm:text-xl
                          font-bold
                          ${
                            isLatest
                              ? "text-green-700"
                              : "text-gray-800"
                          }
                        `}
                      >
                        {step.status}
                      </h4>

                      {isLatest && (
                        <span className="badge badge-success badge-sm sm:badge-md w-fit">
                          Latest Update
                        </span>
                      )}
                    </div>

                    {/* Location */}
                    <p className="text-sm sm:text-base text-gray-700 mb-2 break-words">
                      📍 {step.location}
                    </p>

                    {/* Note */}
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                      {step.note}
                    </p>

                    {/* Time */}
                    <p className="text-xs sm:text-sm text-gray-400 mt-4">
                      {new Date(
                        step.createdAt
                      ).toLocaleString()}
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