import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const OrderDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="h-8 w-56 bg-slate-200 animate-pulse rounded mb-3"></div>
                <div className="h-4 w-80 bg-slate-100 animate-pulse rounded"></div>
              </div>
              <div className="h-10 w-32 bg-indigo-100 animate-pulse rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-5">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="border border-slate-100 rounded-2xl p-5"
                  >
                    <div className="h-6 w-40 bg-slate-200 animate-pulse rounded mb-5"></div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((n) => (
                        <div key={n}>
                          <div className="h-4 w-24 bg-slate-100 animate-pulse rounded mb-2"></div>
                          <div className="h-6 w-40 bg-slate-200 animate-pulse rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border border-slate-100 rounded-2xl p-5">
                <div className="h-7 w-40 bg-slate-200 animate-pulse rounded mb-6"></div>
                <div className="space-y-5">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="flex gap-3 items-center">
                      <div className="h-8 w-8 bg-indigo-100 animate-pulse rounded-full"></div>
                      <div className="h-5 w-36 bg-slate-100 animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            Order Not Found
          </h2>
          <p className="text-slate-500 mt-2">
            No order details were found for this ID.
          </p>
        </div>
      </div>
    );
  }

  const status = order.status || order.orderStatus || "Processing";

  const productName = order.productTitle || order.productName || "N/A";
  const paymentMethod = order.paymentMethod || order.paymentOptions?.[0] || "N/A";
  const unitPrice = Number(order.unitPrice || order.price || 0);
  const quantity = Number(order.quantity || 0);
  const totalPrice = Number(order.totalPrice || order.orderPrice || unitPrice * quantity);

  const statusStyle =
    status === "Delivered"
      ? "bg-green-100 text-green-700 border-green-200"
      : status === "Shipped"
      ? "bg-sky-100 text-sky-700 border-sky-200"
      : status === "Approved"
      ? "bg-indigo-100 text-indigo-700 border-indigo-200"
      : "bg-amber-100 text-amber-700 border-amber-200";

  const steps = [
    "Order Placed",
    "Approved",
    "Shipped",
    "Delivered",
  ];

  const completedSteps =
    status === "Delivered"
      ? 4
      : status === "Shipped"
      ? 3
      : status === "Approved"
      ? 2
      : 1;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
                Order <span className="text-indigo-600">Details</span>
              </h2>
              <p className="text-slate-500 mt-2">
                View complete order, customer, payment and delivery information.
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Order ID:{" "}
                <span className="font-semibold text-slate-700">
                  #{order._id}
                </span>
              </p>
            </div>

            <div
              className={`px-5 py-3 rounded-xl border font-bold text-sm ${statusStyle}`}
            >
              {status}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <p className="text-xs font-bold uppercase text-slate-400">
              Short ID
            </p>
            <h3 className="text-xl font-bold text-indigo-600 mt-2">
              #{order._id?.slice(-6).toUpperCase()}
            </h3>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <p className="text-xs font-bold uppercase text-slate-400">
              Quantity
            </p>
            <h3 className="text-xl font-bold text-slate-800 mt-2">
              {quantity} pcs
            </h3>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <p className="text-xs font-bold uppercase text-slate-400">
              Total Price
            </p>
            <h3 className="text-xl font-bold text-sky-600 mt-2">
              ${totalPrice}
            </h3>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <p className="text-xs font-bold uppercase text-slate-400">
              Payment
            </p>
            <h3 className="text-xl font-bold text-slate-800 mt-2">
              {paymentMethod}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
              <div className="bg-slate-800 px-6 py-4">
                <h3 className="text-white font-bold">
                  Customer Information
                </h3>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <InfoItem
                  label="Full Name"
                  value={`${order.firstName || ""} ${order.lastName || ""}`}
                />
                <InfoItem label="Email Address" value={order.email || "N/A"} />
                <InfoItem
                  label="Contact Number"
                  value={order.contactNumber || "N/A"}
                />
                <InfoItem
                  label="Payment Status"
                  value={order.paymentStatus || "Pending"}
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
              <div className="bg-indigo-600 px-6 py-4">
                <h3 className="text-white font-bold">Product Information</h3>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {order.productImage && (
                    <img
                      src={order.productImage}
                      alt={productName}
                      className="w-full md:w-48 h-48 object-cover rounded-2xl border border-slate-100"
                    />
                  )}

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                      <p className="text-xs font-bold uppercase text-indigo-500">
                        Product Name
                      </p>
                      <h4 className="text-2xl font-bold text-slate-800 mt-1">
                        {productName}
                      </h4>
                    </div>

                    <InfoItem label="Unit Price" value={`$${unitPrice}`} />
                    <InfoItem label="Quantity" value={`${quantity} pcs`} />
                    <InfoItem label="Payment Method" value={paymentMethod} />
                    <InfoItem label="Total Amount" value={`$${totalPrice}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
              <div className="bg-sky-600 px-6 py-4">
                <h3 className="text-white font-bold">Delivery Information</h3>
              </div>

              <div className="p-6 space-y-5">
                <InfoItem
                  label="Delivery Address"
                  value={order.deliveryAddress || "No address provided"}
                />

                <InfoItem
                  label="Additional Notes"
                  value={
                    order.notes ||
                    order.additionalNotes ||
                    "No additional notes provided"
                  }
                />
              </div>
            </div>
          </div>

          {/* Tracking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 sticky top-6">
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Order Tracking
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                Current progress of this order.
              </p>

              <div className="space-y-5">
                {steps.map((step, index) => {
                  const active = index + 1 <= completedSteps;

                  return (
                    <div key={step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                            active
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {active ? "✓" : index + 1}
                        </div>

                        {index !== steps.length - 1 && (
                          <div
                            className={`w-1 h-10 ${
                              active ? "bg-indigo-200" : "bg-slate-200"
                            }`}
                          ></div>
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-800">{step}</h4>
                        <p className="text-sm text-slate-500">
                          {index === 0 && "Order has been placed"}
                          {index === 1 && "Order is approved"}
                          {index === 2 && "Order is on the way"}
                          {index === 3 && "Order delivered successfully"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
                <p className="text-xs font-bold uppercase text-indigo-500">
                  Current Status
                </p>
                <h4 className="text-2xl font-extrabold text-slate-800 mt-1">
                  {status}
                </h4>
              </div>

              <button className="w-full mt-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition">
                Update Tracking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="text-slate-800 font-semibold mt-1 break-words">
        {value}
      </p>
    </div>
  );
};

export default OrderDetails;