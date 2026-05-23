import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const DetailsOrder = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: order, isLoading } = useQuery({
    queryKey: ["order-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-bold">Order Not Found</h2>
      </div>
    );
  }

  // ✅ Normalize data (important for reuse)
  const status = (order.status || "pending").toLowerCase();
  const productName = order.productTitle || order.productName || "N/A";
  const quantity = Number(order.quantity || 0);
  const unitPrice = Number(order.price || order.unitPrice || 0);
  const totalPrice = Number(order.totalPrice) || quantity * unitPrice;

  const userName =
    order.userName ||
    `${order.firstName || ""} ${order.lastName || ""}`.trim() ||
    "Unknown";

  const email = order.userEmail || order.email;

  const address = order.address || order.deliveryAddress || "N/A";
  const contact = order.contact || order.contactNumber || "N/A";

  // ✅ Status Color
  const statusColor =
    status === "approved"
      ? "badge-success"
      : status === "rejected"
        ? "badge-error"
        : status === "shipped"
          ? "badge-info"
          : status === "delivered"
            ? "badge-primary"
            : "badge-warning";

  // ✅ Tracking Steps
  const steps = ["pending", "approved"];

  const currentIndex = steps.indexOf(status);

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-base-100 p-6 rounded-2xl shadow">
          <h2 className="text-3xl font-bold">Order Details</h2>
          <p className="text-sm opacity-60">#{order._id}</p>

          <span className={`badge ${statusColor} mt-3 capitalize`}>
            {status}
          </span>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card title="Quantity" value={`${quantity} pcs`} />
          <Card title="Unit Price" value={`$${unitPrice}`} />
          <Card title="Total Price" value={`$${totalPrice}`} />
          <Card title="Payment" value={order.paymentStatus || "unpaid"} />
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-6">
            {/* Customer */}
            <Section title="Customer Info">
              <Info label="Name" value={userName} />
              <Info label="Email" value={email} />
              <Info label="Contact" value={contact} />
            </Section>

            {/* Product */}
            <Section title="Product Info">
              <Info label="Product" value={productName} />
              <Info label="Quantity" value={`${quantity} pcs`} />
              <Info label="Total" value={`$${totalPrice}`} />
            </Section>

            {/* Delivery */}
            <Section title="Delivery Info">
              <Info label="Address" value={address} />
              <Info label="Notes" value={order.notes || "N/A"} />
            </Section>
          </div>

          {/* RIGHT TRACKING */}
          <div className="bg-base-100 p-6 rounded-2xl shadow">
            <h3 className="font-bold text-lg mb-4">Order Tracking</h3>

            <ul className="space-y-4">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3 items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index <= currentIndex
                        ? "bg-primary text-white"
                        : "bg-base-300"
                    }`}
                  >
                    {index <= currentIndex ? "✓" : index + 1}
                  </div>

                  <span className="capitalize">{step}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm opacity-70">
              Created: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-base-100 p-4 rounded-xl shadow">
    <p className="text-xs opacity-50">{title}</p>
    <h3 className="font-bold text-lg">{value}</h3>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-base-100 p-6 rounded-2xl shadow">
    <h3 className="font-bold mb-4">{title}</h3>
    <div className="grid md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs opacity-50">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default DetailsOrder;
