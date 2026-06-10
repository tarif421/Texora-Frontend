import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";

import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

import { AiFillProduct, AiOutlineLoading3Quarters } from "react-icons/ai";

import { RiFunctionAddLine } from "react-icons/ri";

import { MdManageAccounts } from "react-icons/md";

import { TiShoppingCart } from "react-icons/ti";

import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

import { FaMapLocationDot, FaIndustry } from "react-icons/fa6";

import { CgProfile } from "react-icons/cg";

import useRole from "../Hooks/useRole";
import { GiRolledCloth } from "react-icons/gi";

const DashboardLayout = () => {
  const { role, isLoading } = useRole();

  const navigate = useNavigate();
  const location = useLocation();

  // Auto Redirect
  useEffect(() => {
    if (!isLoading && location.pathname === "/dashboard") {
      if (role === "admin") {
        navigate("/dashboard/manage-users", {
          replace: true,
        });
      } else if (role === "manager") {
        navigate("/dashboard/add-products", {
          replace: true,
        });
      } else if (role === "buyer") {
        navigate("/dashboard/my-orders", {
          replace: true,
        });
      }
    }
  }, [role, isLoading, location.pathname, navigate]);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-sky-200 border-t-sky-700 rounded-full animate-spin"></div>

          <p className="text-sky-700 font-semibold">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // NavLink Style
  const navLinkClass = ({ isActive }) =>
    `
    flex
    items-center
    gap-4
    px-4
    py-3
    rounded-2xl
    transition-all
    duration-300
    text-sm
    font-medium
    ${
      isActive
        ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg"
        : "text-slate-700 hover:bg-sky-100 hover:text-sky-700"
    }
  `;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
        <div className="drawer lg:drawer-open">
          <input
            id="dashboard-drawer"
            type="checkbox"
            className="drawer-toggle"
          />

          {/* MAIN CONTENT */}
          <div className="drawer-content flex flex-col">
            {/* Top Navbar */}
            <div
              className="
              sticky
              top-0
              z-30
              bg-white/80
              backdrop-blur-md
              border-b
              border-sky-100
            "
            >
              <div className="navbar px-4 sm:px-6">
                {/* Mobile Menu */}
                <div className="lg:hidden">
                  <label
                    htmlFor="dashboard-drawer"
                    className="btn btn-ghost btn-circle"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  </label>
                </div>

                {/* Dashboard Title */}
                <div className="flex items-center gap-3">
                  <div
                    className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-gradient-to-r
                    from-sky-600
                    to-blue-700
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-lg
                  "
                  >
                    <FaIndustry className="text-xl" />
                  </div>

                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-sky-700">
                       Dashboard
                    </h1>

                    <p className="text-xs text-slate-500">
                      Manage garments operations smoothly
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              <div
                className="
                bg-white/80
                backdrop-blur-md
                rounded-3xl
                shadow-sm
                border
                border-sky-100
                p-4 sm:p-6
                min-h-[80vh]
              "
              >
                <Outlet />
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="drawer-side z-40">
            <label
              htmlFor="dashboard-drawer"
              className="drawer-overlay"
            ></label>

            <aside
              className="
              w-72
              min-h-full
              bg-white
              border-r
              border-sky-100
              shadow-xl
              flex
              flex-col
            "
            >
              {/* Menu */}
              <ul className="menu p-4 flex-1 space-y-2">
                {/* Homepage */}
                <li>
                  <NavLink to="/" className={navLinkClass}>
                    <FaIndustry className="text-xl" />
                    Homepage
                  </NavLink>
                </li>

                {/* ADMIN */}
                {role === "admin" && (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard/manage-users"
                        className={navLinkClass}
                      >
                        <MdManageAccounts className="text-2xl" />
                        Manage Users
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/all-products"
                        className={navLinkClass}
                      >
                        <AiFillProduct className="text-2xl" />
                        All Products
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/all-orders"
                        className={navLinkClass}
                      >
                        <TiShoppingCart className="text-2xl" />
                        All Orders
                      </NavLink>
                    </li>
                  </>
                )}

                {/* MANAGER */}
                {role === "manager" && (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard/add-products"
                        className={navLinkClass}
                      >
                        <RiFunctionAddLine className="text-2xl" />
                        Add Product
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/manage-product"
                        className={navLinkClass}
                      >
                        <AiFillProduct className="text-2xl" />
                        Manage Products
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/pending-orders"
                        className={navLinkClass}
                      >
                        <AiOutlineLoading3Quarters className="text-2xl" />
                        Pending Orders
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/approved-orders"
                        className={navLinkClass}
                      >
                        <IoCheckmarkDoneCircleSharp className="text-2xl" />
                        Approved Orders
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/my-profile"
                        className={navLinkClass}
                      >
                        <CgProfile className="text-2xl" />
                        My Profile
                      </NavLink>
                    </li>
                  </>
                )}

                {/* BUYER */}
                {role === "buyer" && (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard/my-orders"
                        className={navLinkClass}
                      >
                        <TiShoppingCart className="text-2xl" />
                        My Orders
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/track-orders"
                        className={navLinkClass}
                      >
                        <FaMapLocationDot className="text-2xl" />
                        Track Orders
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/dashboard/my-profile"
                        className={navLinkClass}
                      >
                        <CgProfile className="text-2xl" />
                        My Profile
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>

              {/* Bottom */}
              <div
                className="
                p-5
                border-t
                border-sky-100
                text-center
              "
              >
                <p className="text-sm text-slate-500">© 2026 TEXORA Industry</p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DashboardLayout;
