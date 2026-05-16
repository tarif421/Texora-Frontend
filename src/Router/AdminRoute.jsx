import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (role === "admin") {
    return children;
  }

  return <Navigate to="/unauthorized" />;
};

export default AdminRoute;
