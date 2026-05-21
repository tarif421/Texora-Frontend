import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import Swal from "sweetalert2";
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

  // Delete Product
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/all-products/${id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Product deleted successfully", "success");

        setProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 p-3 sm:p-5 lg:p-8">
        <div className="max-w-7xl mx-auto bg-base-100 rounded-3xl shadow-sm p-4 sm:p-6">

          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="h-8 w-52 bg-gray-200 animate-pulse rounded-xl"></div>

            <div className="h-11 w-40 bg-gray-200 animate-pulse rounded-xl"></div>
          </div>

          {/* Table Skeleton */}
          <div className="overflow-x-auto">
            <table className="table min-w-[900px] lg:min-w-full">
              <thead>
                <tr>
                  {[
                    "Image",
                    "Name",
                    "Price",
                    "Category",
                    "Stock",
                    "Home",
                    "Actions",
                  ].map((item) => (
                    <th key={item}>
                      <div className="h-5 bg-gray-100 rounded-lg"></div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {[1, 2, 3, 4].map((item) => (
                  <tr key={item}>
                    {Array(7)
                      .fill(0)
                      .map((_, i) => (
                        <td key={i}>
                          <div className="h-8 bg-gray-100 animate-pulse rounded-lg"></div>
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">

      <div className="max-w-7xl mx-auto bg-base-100 rounded-3xl shadow-sm p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              All Products
            </h2>

            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Total Products: {products.length}
            </p>
          </div>

          <NavLink
            to="/dashboard/add-NewProducts"
            className="
              btn btn-primary
              rounded-2xl
              text-sm sm:text-base
              px-5
              shadow-sm
            "
          >
            + Add New Product
          </NavLink>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-base-300">

          <table className="table table-zebra min-w-[950px] lg:min-w-full">

            {/* Head */}
            <thead className="bg-base-200 text-gray-700">
              <tr>
                <th className="text-xs sm:text-sm">Image</th>
                <th className="text-xs sm:text-sm">Product Name</th>
                <th className="text-xs sm:text-sm">Price</th>
                <th className="text-xs sm:text-sm">Category</th>
                <th className="text-xs sm:text-sm">Stock</th>
                <th className="text-xs sm:text-sm">Home</th>
                <th className="text-right text-xs sm:text-sm">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover transition duration-200"
                >
                  {/* Image */}
                  <td>
                    <div className="avatar">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden">
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </td>

                  {/* Name */}
                  <td>
                    <div className="font-semibold text-sm sm:text-base text-gray-800 max-w-[220px]">
                      {product.productName}
                    </div>
                  </td>

                  {/* Price */}
                  <td>
                    <span className="font-bold text-sm sm:text-base text-indigo-600">
                      ${product.price}
                    </span>
                  </td>

                  {/* Category */}
                  <td>
                    <span className="badge badge-ghost badge-sm sm:badge-md">
                      {product.category}
                    </span>
                  </td>

                  {/* Stock */}
                  <td>
                    <span className="text-sm sm:text-base">
                      {product.availableQuantity} pcs
                    </span>
                  </td>

                  {/* Toggle */}
                  <td>
                    <input
                      type="checkbox"
                      className="toggle toggle-success toggle-sm sm:toggle-md"
                      defaultChecked
                    />
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex items-center justify-end gap-2">

                      <NavLink
                        to={`/dashboard/update-product/${product._id}`}
                      >
                        <button
                          className="
                            btn btn-xs sm:btn-sm
                            btn-outline btn-info
                            rounded-xl
                          "
                        >
                          Update
                        </button>
                      </NavLink>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="
                          btn btn-xs sm:btn-sm
                          btn-outline btn-error
                          rounded-xl
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-14">

            <h2 className="text-xl sm:text-2xl font-bold text-gray-600">
              No Products Found
            </h2>

            <p className="text-sm sm:text-base text-gray-400 mt-2">
              Products will appear here after adding them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;