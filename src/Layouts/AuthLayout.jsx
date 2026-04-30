import React from "react";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar></Navbar>
     <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default AuthLayout;
