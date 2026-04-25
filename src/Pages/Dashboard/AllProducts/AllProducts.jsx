import { NavLink } from "react-router";

const AllProducts = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>
        <NavLink to= "/dashboard/add-products" className="btn btn-primary">
          Add New Product
        </NavLink>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* Product Row 1 */}
            <tr>
              <td>
                <div className="avatar">
                  <div className="w-14 rounded">
                    <img
                      src="https://i.ibb.co/BKjV18vq/lcardone.jpg"
                      alt="product"
                    />
                  </div>
                </div>
              </td>
              <td className="font-semibold">Windbreaker Jacket</td>
              <td>$18.90</td>
              <td>Outerwear</td>
              <td>Admin</td>
              <td>
                <input type="checkbox" className="toggle toggle-success" checked readOnly />
              </td>
              <td className="text-right space-x-2">
                <button className="btn btn-sm btn-outline btn-info">
                  Update
                </button>
                <button className="btn btn-sm btn-outline btn-error">
                  Delete
                </button>
              </td>
            </tr>

        

            
          </tbody>
        </table>
      </div>

      {/* Info Text */}
      <p className="text-sm text-gray-500 mt-4">
        Toggle “Show on Home” to control which products appear on the Home page.
      </p>
    </div>
  );
};

export default AllProducts;
