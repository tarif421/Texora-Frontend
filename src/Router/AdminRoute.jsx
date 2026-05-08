import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <p>Loading....</p>;
  }
  if (user && role === "admin") {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
