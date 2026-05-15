import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";

import HomePage from "../Pages/Home/HomePage";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AllProducts from "../Pages/Dashboard/Admin/AllProducts/AllProducts";
import AllOrders from "../Pages/Dashboard/Admin/AllOrders/AllOrders";
import AddNewProducts from "../Pages/Dashboard/Admin/AllProducts/AddNewProducts";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ProductDetails from "../Pages/Home/Products/ProductDetails";
import BookingPage from "../Pages/Home/Products/BookingPage";
import AdminRoute from "./AdminRoute";
import ManageRoute from "./ManagerRoute";
import AddProduct from "../Pages/Dashboard/Manager/AddProduct";

import ManageProducts from "../Pages/Dashboard/Manager/ManageProducts";
import MyProfile from "../Pages/Dashboard/Manager/MyProfile";
import PendingOrders from "../Pages/Dashboard/Manager/PendingOrders";
import MyOrders from "../Pages/Dashboard/Buyer/MyOrders";
import PrivateRoute from "./PrivateRoute";
import OrderDetails from "../Pages/Dashboard/Admin/AllOrders/OrderDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/Details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/productsDetails/${params.id}`),
        element: <ProductDetails />,
      },
      {
        path: "/booking/:id",
        element: <BookingPage />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/productsDetails/${params.id}`),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>,
      </PrivateRoute>
    ),
    children: [
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <AdminRoute>
            <AllProducts />
          </AdminRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <AdminRoute>
            <AllOrders />
          </AdminRoute>
        ),
      },
          {
        path: "my-orders",
        element: (
          <AdminRoute>
            <MyOrders></MyOrders>
          </AdminRoute>
        ),
      },
      {
        path: "order-details/:id",
        element: (
          <AdminRoute>
            <OrderDetails />
          </AdminRoute>
        ),
      },
      {
        path: "add-NewProducts",
        element: <AdminRoute><AddNewProducts></AddNewProducts></AdminRoute>
      },
      {
        path: "add-products",
        element: (
          <ManageRoute>
            <AddProduct />
          </ManageRoute>
        ),
      },
   
      {
        path: "manage-product",
        element: (
          <ManageRoute>
            <ManageProducts />
          </ManageRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <ManageRoute>
            <MyProfile />
          </ManageRoute>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <ManageRoute>
            <PendingOrders />
          </ManageRoute>
        ),
      },
  
  
    ],
  },
]);
