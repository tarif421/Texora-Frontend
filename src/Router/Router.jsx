import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";

import HomePage from "../Pages/Home/HomePage";
import DashboardLayout from "../Layouts/DashboardLayout";

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
    element: <DashboardLayout></DashboardLayout>
  }
]);
