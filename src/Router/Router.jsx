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
import ManagerRoute from "./ManagerRoute";
import AddProduct from "../Pages/Dashboard/Manager/AddProduct";

import ManageProducts from "../Pages/Dashboard/Manager/ManageProducts";
import MyProfile from "../Pages/Dashboard/Manager/MyProfile";
import PendingOrders from "../Pages/Dashboard/Manager/PendingOrders";

import PrivateRoute from "./PrivateRoute";

import OrderDetails from "../Pages/Dashboard/Admin/AllOrders/OrderDetails";
import AdminManagerRoute from "../Router/AdminManagerRoute";
import ApproveOrders from "../Pages/Dashboard/Manager/ApproveOrders";
import BuyerRoute from "./BuyerRoute";
import MyOrders from "../Pages/Dashboard/Buyer/MyOrders";
import DetailsOrder from "../Pages/Dashboard/Buyer/DetailsOrders";
import TrackOrders from "../Pages/Dashboard/Buyer/TrackOrders";
import TrackOrder from "../Pages/Dashboard/Buyer/TrackOrder";
import AllProduct from "../Pages/AllProducts/AllProduct";
import AboutUs from "../AboutUs/AboutUs";
import ContactUs from "../ContactUs/ContactUs";
import UpdateProduct from "../Pages/Dashboard/Admin/UpdateProduct";
import ErrorPage from "../ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
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
      {
        path: "/allProducts",
        element: <AllProduct></AllProduct>,
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
      {
        path: "/aboutUS",
        Component: AboutUs,
      },
      {
        path: "/contactUS",
        Component: ContactUs,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
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
      // {
      //   path: "my-orders",
      //   element: (
      //     <AdminRoute>
      //       <MyOrders></MyOrders>
      //     </AdminRoute>
      //   ),
      // },
      // {
      //   path: "order-details/:id",
      //   element: (
      //     <AdminRoute>
      //       <OrderDetails />
      //     </AdminRoute>
      //   ),
      // },
      {
        path: "add-NewProducts",
        element: (
          <AdminRoute>
            <AddNewProducts></AddNewProducts>
          </AdminRoute>
        ),
      },
      {
        path: "add-products",
        element: (
          <ManagerRoute>
            <AddProduct />
          </ManagerRoute>
        ),
      },

      {
        path: "manage-product",
        element: (
          <ManagerRoute>
            <ManageProducts />
          </ManagerRoute>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <ManagerRoute>
            <PendingOrders></PendingOrders>
          </ManagerRoute>
        ),
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },

      {
        path: "order-details/:id",
        element: (
          <AdminManagerRoute>
            <OrderDetails />
          </AdminManagerRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct />,
      },
      {
        path: "approved-orders",
        element: (
          <ManagerRoute>
            <ApproveOrders />
          </ManagerRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <BuyerRoute>
            <MyOrders />
          </BuyerRoute>
        ),
      },
      {
        path: "details-order/:id",
        element: (
          <BuyerRoute>
            <DetailsOrder />
          </BuyerRoute>
        ),
      },

      {
        path: "track-orders",
        element: <TrackOrders />,
      },

      {
        path: "track-order/:orderId",
        element: <TrackOrder />,
      },
    ],
  },
]);
