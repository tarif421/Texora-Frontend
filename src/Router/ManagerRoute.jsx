import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import { Navigate } from "react-router";

const ManageRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <p>Loading....</p>;
  }
  if (user && role === "manager") {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default ManageRoute;