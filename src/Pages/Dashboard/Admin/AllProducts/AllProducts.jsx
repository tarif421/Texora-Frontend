import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axiosSecure.get("/all-Products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
        </div>

        {/* Table Skeleton */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-100">
                {[
                  "Image",
                  "Name",
                  "Price",
                  "Category",
                  "Stock",
                  "Home",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="h-12 bg-gray-50"></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((n) => (
                <tr key={n}>
                  {Array(7)
                    .fill(0)
                    .map((_, i) => (
                      <td key={i}>
                        <div className="h-8 bg-gray-100 animate-pulse rounded"></div>
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          All Products (Total: {products.length})
        </h2>
        <NavLink to="/dashboard/add-products" className="btn btn-primary">
          + Add New Product
        </NavLink>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Show on Home</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td>
                  <div className="avatar">
                    <div className="w-14 h-14 rounded-lg">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </td>
                <td className="font-semibold text-gray-800">
                  {product.productName}
                </td>
                <td className="font-bold text-indigo-600">${product.price}</td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {product.category}
                  </span>
                </td>
                <td>{product.availableQuantity} pcs</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-success toggle-sm"
                    defaultChecked
                  />
                </td>
                <td className="text-right space-x-2">
                  <button className="btn btn-xs btn-outline btn-info">
                    Update
                  </button>
                  <button className="btn btn-xs btn-outline btn-error">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          No products found in the database.
        </div>
      )}
    </div>
  );
};

export default AllProducts;
