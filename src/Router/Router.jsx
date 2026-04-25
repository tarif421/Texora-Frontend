import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";

import HomePage from "../Pages/Home/HomePage";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AllProducts from "../Pages/Dashboard/AllProducts/AllProducts";
import AllOrders from "../Pages/Dashboard/AllOrders/AllOrders";
import AddNewProducts from "../Pages/Dashboard/AllProducts/AddNewProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "manage-users",
        Component: ManageUsers,
      },
      {
        path: "all-products",
        Component: AllProducts,
      },
      {
        path: "all-orders",
        Component: AllOrders,
      },
      {
        path: "add-products",
        Component: AddNewProducts,
      },
    ],
  },
]);
